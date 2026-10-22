import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => { api.get("/reviews").then(({ data }) => setReviews(data.reviews)).catch(() => setReviews([])); }, []);

  return <section className="section-space bg-orange-50">
    <div className="container-page">
      <div className="mb-12 text-center"><p className="eyebrow">Guest stories</p><h2 className="display-title mt-2 text-4xl font-bold sm:text-5xl">Loved by local diners</h2><p className="mt-3 text-stone-500">Real experiences shared by our community.</p></div>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.length ? reviews.map((review) => <article key={review._id} className="surface rounded-3xl p-7">
          <div className="text-lg tracking-wider text-orange-500">{"★".repeat(review.rating)}<span className="text-stone-200">{"★".repeat(5 - review.rating)}</span></div>
          <p className="mt-5 text-lg leading-7 text-stone-700">“{review.comment}”</p>
          <div className="mt-7 border-t border-stone-100 pt-5"><h3 className="font-bold">{review.user?.name || "TableReserve customer"}</h3><p className="mt-1 text-sm text-stone-500">{review.restaurant?.name} · {new Date(review.createdAt).toLocaleDateString()}</p></div>
        </article>) : <div className="md:col-span-3 rounded-3xl border border-dashed border-orange-200 bg-white p-10 text-center"><p className="font-bold text-stone-700">Be the first to share a dining story.</p></div>}
      </div>
    </div>
  </section>;
}
