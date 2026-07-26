import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const PRICE_PER_GUEST = 50;

const loadRazorpay = () => new Promise((resolve) => {
  if (window.Razorpay) return resolve(true);
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

export default function Reservation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const restaurant = state?.restaurant;
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [form, setForm] = useState({ date: state?.date || "", time: state?.time || "", guests: state?.guests || 2 });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  if (!restaurant) return <main className="page-shell grid min-h-screen place-items-center px-4"><div className="surface max-w-md rounded-3xl p-10 text-center"><h1 className="display-title text-4xl font-bold">Restaurant not found</h1><p className="mt-3 text-stone-500">Choose a restaurant from the homepage before making a reservation.</p><Link to="/" className="btn-primary mt-6">Browse restaurants</Link></div></main>;

  const totalAmount = Number(form.guests) * PRICE_PER_GUEST;

  const startPayment = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token") || user?.role !== "customer") {
      navigate("/login");
      return;
    }
    setSubmitting(true);
    setNotice({ type: "", text: "" });
    try {
      const checkoutReady = await loadRazorpay();
      if (!checkoutReady) throw new Error("Razorpay Checkout could not be loaded. Check your connection and try again.");

      const { data } = await api.post("/payments/create-order", {
        restaurantId: restaurant._id,
        date: form.date,
        time: form.time,
        guests: Number(form.guests),
      });

      const checkout = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "TableReserve",
        description: `Reservation fee · ${data.restaurantName}`,
        order_id: data.orderId,
        prefill: { name: user?.name || "", email: user?.email || "" },
        notes: { reservationId: data.reservationId },
        theme: { color: "#e94b10" },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setNotice({ type: "info", text: "Payment was cancelled. No booking request was sent to the restaurant." });
          },
        },
        handler: async (response) => {
          try {
            const verification = await api.post("/payments/verify", {
              reservationId: data.reservationId,
              ...response,
            });
            setNotice({ type: "success", text: verification.data.message });
            window.setTimeout(() => navigate("/bookings"), 1800);
          } catch (error) {
            setNotice({ type: "error", text: error.response?.data?.message || "Payment verification failed. Please contact support with your payment ID." });
          } finally {
            setSubmitting(false);
          }
        },
      });
      checkout.on("payment.failed", (response) => {
        setSubmitting(false);
        setNotice({ type: "error", text: response.error?.description || "Payment failed. Please try again." });
      });
      checkout.open();
    } catch (error) {
      setSubmitting(false);
      setNotice({ type: "error", text: error.response?.data?.message || error.message || "Unable to start payment." });
    }
  };

  return <main className="page-shell px-4 py-10 sm:py-16">
    <div className="container-page">
      <Link to="/" className="mb-6 inline-flex font-bold text-stone-600 hover:text-orange-600">← Back to restaurants</Link>
      <div className="surface grid overflow-hidden rounded-[32px] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[340px] lg:min-h-[680px]"><img src={restaurant.image} alt={restaurant.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10"><span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold backdrop-blur">★ {restaurant.rating || "New"}</span><h1 className="display-title mt-4 text-4xl font-bold sm:text-5xl">{restaurant.name}</h1><p className="mt-3 text-stone-200">{restaurant.cuisine} · {restaurant.area}, {restaurant.city}</p></div></div>

        <div className="p-6 sm:p-10 lg:p-12">
          <p className="eyebrow">Secure checkout</p><h2 className="display-title mt-2 text-4xl font-bold">Complete your reservation</h2><p className="mt-3 text-stone-500">Your booking request is sent only after secure payment verification.</p>
          <div className="mt-6 inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">RAZORPAY TEST MODE · NO REAL MONEY</div>

          <form onSubmit={startPayment} className="mt-8 space-y-5">
            <label className="block text-sm font-bold">Date<input required type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="input-ui mt-2 font-normal" /></label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold">Time<select required value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} className="input-ui mt-2 font-normal"><option value="">Choose time</option>{restaurant.availableSlots?.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
              <label className="block text-sm font-bold">Party size<select value={form.guests} onChange={(event) => setForm({ ...form, guests: event.target.value })} className="input-ui mt-2 font-normal">{[1,2,3,4,5,6,7,8].map((guests) => <option key={guests} value={guests}>{guests} {guests === 1 ? "guest" : "guests"}</option>)}</select></label>
            </div>

            <div className="rounded-3xl bg-stone-900 p-6 text-white"><div className="flex justify-between text-sm text-stone-400"><span>₹{PRICE_PER_GUEST} × {form.guests} guests</span><span>₹{totalAmount}</span></div><div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-xl font-bold"><span>Total payable</span><span className="text-orange-400">₹{totalAmount}</span></div></div>

            {notice.text && <div className={`rounded-2xl p-4 text-sm font-semibold ${notice.type === "success" ? "bg-emerald-50 text-emerald-800" : notice.type === "error" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>{notice.text}</div>}
            <button disabled={submitting} className="btn-primary w-full py-4 disabled:cursor-wait disabled:bg-stone-400 disabled:shadow-none">{submitting ? "Preparing secure payment…" : `Pay ₹${totalAmount} with Razorpay`}</button>
            <p className="text-center text-xs leading-5 text-stone-400">Payment is processed by Razorpay. TableReserve never receives or stores your card or UPI credentials.</p>
          </form>
        </div>
      </div>
    </div>
  </main>;
}
