import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const filters = ["pending", "approved", "rejected"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get(`/admin/restaurants?status=${status}`)
      .then(({ data }) => {
        if (active) setRestaurants(data.restaurants);
      })
      .catch((requestError) => {
        if (!active) return;
        if (requestError.response?.status === 401 || requestError.response?.status === 403) navigate("/login");
        setError(requestError.response?.data?.message || "Could not load restaurant applications.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [navigate, status]);

  const review = async (restaurantId, nextStatus) => {
    const note = nextStatus === "rejected"
      ? window.prompt("Reason for rejection (optional):") ?? null
      : "";
    if (note === null) return;
    try {
      await api.patch(`/admin/restaurants/${restaurantId}/review`, { status: nextStatus, note });
      setRestaurants((current) => current.filter((restaurant) => restaurant._id !== restaurantId));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not update this application.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return <main className="min-h-screen bg-orange-50 p-6 md:p-10">
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div><p className="text-orange-600 font-semibold">TableReserve</p><h1 className="text-3xl font-bold">Restaurant approvals</h1></div>
        <button onClick={logout} className="border border-red-500 text-red-600 px-4 py-2 rounded-lg">Logout</button>
      </header>
      <div className="flex gap-2 mb-6">
        {filters.map((filter) => <button key={filter} onClick={() => { setLoading(true); setError(""); setStatus(filter); }} className={`capitalize px-4 py-2 rounded-lg font-medium ${status === filter ? "bg-orange-600 text-white" : "bg-white border"}`}>{filter}</button>)}
      </div>
      {error && <p className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-5">{error}</p>}
      {loading ? <p>Loading applications...</p> : restaurants.length === 0 ? <div className="bg-white rounded-xl p-10 text-center text-gray-500">No {status} restaurant applications.</div> :
        <div className="grid gap-5">{restaurants.map((restaurant) => <article key={restaurant._id} className="bg-white rounded-xl shadow p-5 grid md:grid-cols-[140px_1fr_auto] gap-5">
          <img src={restaurant.image} alt={restaurant.name} className="w-full h-28 object-cover rounded-lg" />
          <div><h2 className="text-xl font-bold">{restaurant.name}</h2><p className="text-gray-600">{restaurant.area}, {restaurant.city}</p><div className="mt-3 text-sm text-gray-700 space-y-1"><p>Demo owner: {restaurant.ownerName}</p><p>Demo email: {restaurant.email}</p><p>Demo phone: {restaurant.phone}</p>{restaurant.fssaiNumber && <p>Demo FSSAI reference: {restaurant.fssaiNumber}</p>}<p className="font-medium text-amber-700">Educational listing — details are not regulatory verification.</p>{restaurant.approvalNote && <p className="text-red-600">Note: {restaurant.approvalNote}</p>}</div></div>
          <div className="flex md:flex-col gap-2">{status !== "approved" && <button onClick={() => review(restaurant._id, "approved")} className="bg-green-600 text-white px-4 py-2 rounded-lg">Approve</button>}{status !== "rejected" && <button onClick={() => review(restaurant._id, "rejected")} className="bg-red-600 text-white px-4 py-2 rounded-lg">Reject</button>}</div>
        </article>)}</div>}
    </div>
  </main>;
}
