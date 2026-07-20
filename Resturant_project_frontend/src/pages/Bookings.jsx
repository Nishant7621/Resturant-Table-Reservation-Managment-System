import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Bookings() {
  const navigate = useNavigate(); const [bookings, setBookings] = useState([]); const [error, setError] = useState("");
  useEffect(() => { if (!localStorage.getItem("token")) { navigate("/login"); return; } api.get("/reservations/me").then(({ data }) => setBookings(data.reservations)).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load reservations.")); }, [navigate]);
  return <main className="min-h-screen bg-orange-50 px-6 py-28"><div className="max-w-4xl mx-auto"><h1 className="text-4xl font-bold text-orange-600 mb-8">My Bookings</h1>{error ? <p className="text-red-600">{error}</p> : bookings.length ? <div className="space-y-4">{bookings.map((booking) => <article key={booking._id} className="bg-white p-6 rounded-xl shadow flex justify-between gap-4"><div><h2 className="font-bold text-xl">{booking.restaurant?.name || "Restaurant"}</h2><p className="text-gray-600">{booking.date} at {booking.time} · {booking.guests} guests</p></div><span className="capitalize text-orange-700">{booking.status}</span></article>)}</div> : <div className="bg-white rounded-xl p-8 shadow"><p className="text-gray-600 mb-4">You have no reservations yet.</p><Link to="/" className="text-orange-600 font-semibold">Find a restaurant</Link></div>}</div></main>;
}
