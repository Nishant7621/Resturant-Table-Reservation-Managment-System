import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const DEFAULT_RESTAURANT_IMAGE = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";

const LoadingCards = () => (
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div key={item} className="overflow-hidden rounded-[28px] border border-stone-200/80 bg-white p-4 shadow-sm">
        <div className="skeleton h-64 w-full rounded-2xl" />
        <div className="space-y-3 pt-5 pb-2 px-2">
          <div className="flex justify-between">
            <div className="skeleton h-6 w-1/2 rounded-lg" />
            <div className="skeleton h-6 w-12 rounded-lg" />
          </div>
          <div className="skeleton h-4 w-3/4 rounded-lg" />
          <div className="skeleton h-12 w-full rounded-xl mt-4" />
        </div>
      </div>
    ))}
  </div>
);

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

  return (
    <section data-restaurants className="section-space bg-[#faf8f5] scroll-mt-24">
      <div className="container-page">
        {/* Header with City context & Counters */}
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/70 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-800">
              <span className="h-2 w-2 rounded-full bg-orange-600" />
              Verified & Handpicked
            </div>
            <h2 className="display-title mt-3 text-4xl font-extrabold text-stone-900 sm:text-5xl">
              {searchData?.city ? `Premier Dining in ${searchData.city}` : "Curated Restaurant Collection"}
            </h2>
            <p className="mt-2.5 text-base text-stone-500">
              Instant reservations, live table management, and 100% vegetarian culinary excellence.
            </p>
          </div>

          {!loading && !error && (
            <div className="flex items-center gap-3">
              <span className="rounded-2xl border border-stone-200/80 bg-white px-5 py-2.5 text-sm font-extrabold text-stone-800 shadow-sm">
                <span className="text-orange-600">{restaurants.length}</span> {restaurants.length === 1 ? "Venue" : "Venues"} Available
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <LoadingCards />
        ) : error ? (
          <div className="surface rounded-[32px] p-12 text-center max-w-xl mx-auto shadow-xl">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-orange-50 text-3xl font-bold text-orange-600">
              !
            </div>
            <h3 className="text-2xl font-bold text-stone-900">Unable to Fetch Tables</h3>
            <p className="mx-auto mt-2 text-stone-500">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                setReloadKey((key) => key + 1);
              }}
              className="btn-primary mt-6 text-sm uppercase tracking-wider"
            >
              Retry Connection
            </button>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="rounded-[32px] border-2 border-dashed border-stone-300 bg-white p-14 text-center max-w-lg mx-auto shadow-sm">
            <h3 className="text-xl font-bold text-stone-800">No venues found for this search</h3>
            <p className="mt-2 text-sm text-stone-500">Try choosing &quot;All Areas&quot; or selecting a different city.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <article
                key={restaurant._id || restaurant.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-stone-200/70 bg-white p-3.5 shadow-[0_10px_35px_-10px_rgba(28,25,23,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(234,88,12,0.18)] hover:border-orange-200"
              >
                {/* Visual card header & badge overlay */}
                <div className="relative overflow-hidden rounded-[22px] h-64 bg-stone-100">
                  <img
                    src={restaurant.image || DEFAULT_RESTAURANT_IMAGE}
                    alt={restaurant.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_RESTAURANT_IMAGE;
                    }}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />

                  {/* Top floating badges */}
                  <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-stone-900 shadow-md backdrop-blur-md">
                      <span className="text-amber-500">★</span> {restaurant.rating || "4.8"}
                    </span>
                    <span className="rounded-full bg-emerald-600/90 text-white px-2.5 py-1 text-[11px] font-black tracking-wider uppercase shadow-md backdrop-blur-md">
                      Pure Veg
                    </span>
                  </div>

                  <span className="absolute right-3.5 top-3.5 rounded-full bg-stone-900/80 text-white px-3 py-1 text-xs font-extrabold backdrop-blur-md shadow-md">
                    {restaurant.price || "₹₹"}
                  </span>

                  {/* Bottom location pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-bold drop-shadow">
                    <span className="flex items-center gap-1.5 bg-stone-950/70 px-3 py-1 rounded-full backdrop-blur-md">
                      <span className="text-orange-400">📍</span> {restaurant.area}, {restaurant.city}
                    </span>
                    <span className="bg-stone-950/70 px-2.5 py-1 rounded-full backdrop-blur-md">
                      {restaurant.tables || 15} Tables
                    </span>
                  </div>
                </div>

                {/* Card body & details */}
                <div className="flex flex-1 flex-col justify-between p-4 pt-5">
                  <div>
                    <h3 className="text-xl font-extrabold text-stone-900 tracking-tight group-hover:text-orange-600 transition">
                      {restaurant.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-stone-500 line-clamp-1">
                      {restaurant.cuisine || "Multi-Cuisine Pure Veg"}
                    </p>
                  </div>

                  {/* Available Time Slots Quick View */}
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs text-stone-400 font-semibold mb-2">
                      <span>Available Slots</span>
                      <span className="text-emerald-600 font-bold">Instant Confirmation</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(restaurant.availableSlots || ["12:00 PM", "2:00 PM", "7:00 PM", "9:00 PM"]).slice(0, 3).map((slot) => (
                        <span key={slot} className="rounded-lg bg-stone-50 px-2 py-0.5 text-[11px] font-bold text-stone-600 border border-stone-200/60">
                          {slot}
                        </span>
                      ))}
                      {(restaurant.availableSlots?.length || 4) > 3 && (
                        <span className="rounded-lg bg-stone-50 px-1.5 py-0.5 text-[11px] font-bold text-stone-400">
                          +more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card footer CTA */}
                  <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Cover Fee</p>
                      <p className="text-sm font-black text-stone-900">₹50 <span className="text-xs font-normal text-stone-400">/ guest</span></p>
                    </div>
                    <button
                      onClick={() => navigate("/reservation", { state: { restaurant, ...searchData } })}
                      className="btn-primary py-2.5 px-5 text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
                    >
                      Reserve Table →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
