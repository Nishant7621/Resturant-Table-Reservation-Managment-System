import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => { api.get("/reviews").then(({ data }) => setReviews(data.reviews)).catch(() => setReviews([])); }, []);
  return <section className="py-20 bg-gray-100"><div className="text-center mb-12"><h2 className="text-4xl font-bold text-orange-600">What Our Customers Say</h2><p className="text-gray-600 mt-3">Real experiences shared by our diners.</p></div>
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">{reviews.length ? reviews.map((review) => <article key={review._id} className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-bold text-lg">{review.user?.name || "TableReserve customer"}</h3><div className="text-yellow-500 text-xl my-3">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div><p className="text-gray-600">{review.comment}</p><p className="mt-5 text-sm text-gray-500">🍽️ {review.restaurant?.name} · {new Date(review.createdAt).toLocaleDateString()}</p></article>) : <p className="md:col-span-3 text-center text-gray-500">No reviews yet. Be the first to share your experience.</p>}</div>
  </section>;
}
