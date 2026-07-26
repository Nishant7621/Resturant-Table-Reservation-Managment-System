import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const LoadingCards = () => <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="overflow-hidden rounded-3xl border border-stone-100 bg-white"><div className="skeleton h-60" /><div className="space-y-3 p-6"><div className="skeleton h-6 rounded-lg" /><div className="skeleton h-4 w-2/3 rounded-lg" /><div className="skeleton h-12 rounded-xl" /></div></div>)}</div>;

export default function FeaturedRestaurants({ searchData }) {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    api.get("/restaurants", { params: searchData })
      .then(({ data }) => { if (active) setRestaurants(data.restaurants); })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || "We could not reach the restaurant service."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [reloadKey, searchData]);

  return <section data-restaurants className="section-space bg-white scroll-mt-20">
    <div className="container-page">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="eyebrow">Curated for you</p><h2 className="display-title mt-2 text-4xl font-bold sm:text-5xl">{searchData.city ? `Restaurants in ${searchData.city}` : "Featured restaurants"}</h2><p className="mt-3 text-stone-500">Only admin-approved restaurants appear here.</p></div>
        {!loading && !error && <span className="w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">{restaurants.length} {restaurants.length === 1 ? "place" : "places"}</span>}
      </div>

      {loading ? <LoadingCards /> : error ? <div className="surface rounded-3xl p-10 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-50 text-2xl">!</div><h3 className="text-xl font-bold">Restaurants are taking longer to load</h3><p className="mx-auto mt-2 max-w-lg text-stone-500">{error} The free server may need a moment to wake up.</p><button onClick={() => { setLoading(true); setError(""); setReloadKey((key) => key + 1); }} className="btn-primary mt-6">Try again</button></div>
      : restaurants.length === 0 ? <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center"><h3 className="text-xl font-bold">No matching restaurants yet</h3><p className="mt-2 text-stone-500">Try another area or broaden your search.</p></div>
      : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{restaurants.map((restaurant) => <article key={restaurant._id} className="group overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-[0_12px_40px_rgba(62,34,20,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(62,34,20,.14)]">
        <div className="relative overflow-hidden"><img src={restaurant.image} alt={restaurant.name} className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-sm font-extrabold shadow-sm">★ {restaurant.rating || "New"}</span></div>
        <div className="p-6"><div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-extrabold">{restaurant.name}</h3><p className="mt-1 text-sm text-stone-500">{restaurant.cuisine || "Restaurant"}</p></div><span className="font-bold text-stone-600">{restaurant.price}</span></div>
          <p className="mt-5 flex items-center gap-2 text-sm text-stone-600"><span className="text-orange-600">●</span>{restaurant.area}, {restaurant.city}</p>
          <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-5"><div><p className="text-xs font-bold uppercase tracking-wide text-stone-400">Booking fee</p><p className="font-extrabold text-stone-800">₹50 / guest</p></div><button onClick={() => navigate("/reservation", { state: { restaurant, ...searchData } })} className="btn-primary">Reserve <span aria-hidden="true">→</span></button></div>
        </div>
      </article>)}</div>}
    </div>
  </section>;
}
