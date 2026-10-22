import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) { navigate("/login"); return; }
    api.get("/reservations/me")
      .then(({ data }) => setBookings(data.reservations))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load reservations."))
      .finally(() => setLoading(false));
  }, [navigate]);

  return <main className="page-shell px-4 py-12 sm:py-16"><div className="container-page">
    <Link to="/" className="mb-6 inline-flex font-bold text-stone-600 hover:text-orange-600">← Back to home</Link>
    <div className="mb-9"><p className="eyebrow">Your dining plans</p><h1 className="display-title mt-2 text-5xl font-bold">My bookings</h1><p className="mt-3 text-stone-500">Payment and restaurant confirmation are shown separately.</p></div>
    {loading ? <div className="space-y-4">{[1,2].map((item) => <div key={item} className="skeleton h-40 rounded-3xl" />)}</div>
    : error ? <div className="rounded-3xl bg-red-50 p-8 font-semibold text-red-700">{error}</div>
    : bookings.length ? <div className="space-y-5">{bookings.map((booking) => {
      const paymentStatus = booking.paymentStatus || "not_required";
      return <article key={booking._id} className="surface overflow-hidden rounded-3xl">
        <div className="grid md:grid-cols-[150px_1fr_auto] md:items-center">
          {booking.restaurant?.image ? <img src={booking.restaurant.image} alt="" className="h-44 w-full object-cover md:h-full" /> : <div className="h-32 bg-orange-100" />}
          <div className="p-6"><h2 className="text-xl font-extrabold">{booking.restaurant?.name || "Restaurant"}</h2><p className="mt-2 text-stone-600">{booking.date} at {booking.time} · {booking.guests} guests</p><p className="mt-1 text-sm text-stone-400">Booking fee: ₹{booking.bookingFee}</p></div>
          <div className="flex flex-row gap-2 border-t border-stone-100 p-6 md:flex-col md:border-l md:border-t-0">
            <span className={`status-pill status-${paymentStatus === "paid" ? "approved" : paymentStatus === "failed" ? "rejected" : "pending"}`}>Payment: {paymentStatus.replace("_", " ")}</span>
            <span className={`status-pill status-${booking.status}`}>Booking: {booking.status}</span>
          </div>
        </div>
      </article>;
    })}</div>
    : <div className="surface rounded-3xl p-10 text-center"><h2 className="text-2xl font-bold">No bookings yet</h2><p className="mt-2 text-stone-500">Your next memorable meal is only a few clicks away.</p><Link to="/" className="btn-primary mt-6">Find a restaurant</Link></div>}
  </div></main>;
}
