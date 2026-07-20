import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const Reservation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const restaurant = state?.restaurant;
  const [form, setForm] = useState({ date: state?.date || "", time: state?.time || "", guests: state?.guests || 2 });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  if (!restaurant) return <div className="min-h-screen flex flex-col items-center justify-center gap-4"><h2 className="text-3xl font-bold">Restaurant Not Found</h2><button onClick={() => navigate("/")} className="bg-orange-600 text-white px-6 py-3 rounded-lg">Back to Home</button></div>;

  const submit = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) return navigate("/login");
    setSubmitting(true); setMessage("");
    try {
      const { data } = await api.post("/reservations", { restaurant: restaurant._id, ...form, guests: Number(form.guests) });
      setMessage(data.message);
      event.target.reset();
    } catch (error) { setMessage(error.response?.data?.message || "Unable to create reservation."); }
    finally { setSubmitting(false); }
  };

  return <div className="min-h-screen bg-orange-50 py-12 px-6"><div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
    <img src={restaurant.image} alt={restaurant.name} className="w-full h-72 object-cover" />
    <div className="p-8"><h1 className="text-4xl font-bold text-orange-600 mb-2">{restaurant.name}</h1><p className="text-gray-600 mb-8">⭐ {restaurant.rating} · {restaurant.cuisine} · 📍 {restaurant.area}, {restaurant.city}</p>
      <h2 className="text-2xl font-semibold mb-6">Reservation Details</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
        <input required type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="border rounded-lg p-3" />
        <select required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="border rounded-lg p-3"><option value="">Select a time</option>{restaurant.availableSlots?.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select>
        <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="border rounded-lg p-3">{[1,2,3,4,5,6,7,8].map((number) => <option key={number} value={number}>{number} {number === 1 ? "Guest" : "Guests"}</option>)}</select>
        <p className="text-sm text-gray-500 self-center">You will receive a confirmation immediately.</p>
        {message && <p className="md:col-span-2 text-center text-orange-700">{message}</p>}
        <button disabled={submitting} type="submit" className="md:col-span-2 bg-orange-600 disabled:bg-orange-300 hover:bg-orange-700 text-white py-4 rounded-lg text-lg font-semibold">{submitting ? "Confirming..." : "Confirm Reservation"}</button>
      </form>
    </div></div></div>;
};
export default Reservation;
