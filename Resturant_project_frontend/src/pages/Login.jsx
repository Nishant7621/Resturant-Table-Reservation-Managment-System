import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("customer");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); setError("");
    try {
      const { data } = await api.post("/auth/login", { ...formData, role: loginType });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      navigate(loginType === "admin" ? "/admin" : loginType === "restaurant" ? "/restaurant-dashboard" : "/");
    } catch (requestError) { setError(requestError.response?.data?.message || "Login failed. Please try again."); }
  };

  return <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4"><div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"><h1 className="text-3xl font-bold text-center text-orange-600 mb-2">Login</h1><p className="text-center text-gray-500 mb-8">Welcome to TableReserve</p>
    <div className="flex mb-8 border rounded-lg overflow-hidden">{["customer", "restaurant", "admin"].map((type) => <button key={type} type="button" onClick={() => { setLoginType(type); setError(""); }} className={`flex-1 py-3 capitalize font-semibold ${loginType === type ? "bg-orange-600 text-white" : "bg-white"}`}>{type}</button>)}</div>
    <form className="space-y-5" onSubmit={handleSubmit}><p className="text-center font-medium text-gray-700">{loginType === "restaurant" ? "Restaurant owner login" : loginType === "admin" ? "Administrator login" : "Customer login"}</p><label className="block"><span className="block mb-2 font-medium">Email</span><input type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="Enter email" required className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" /></label><label className="block"><span className="block mb-2 font-medium">Password</span><input type="password" value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} placeholder="Enter password" required className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" /></label>{error && <p className="text-center text-red-600">{error}</p>}<button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">{loginType === "admin" ? "Admin Login" : loginType === "restaurant" ? "Restaurant Login" : "Customer Login"}</button></form>
    <p className="text-center mt-6 text-gray-600">Don't have an account? <Link to="/register" className="text-orange-600 font-semibold hover:underline">Register</Link></p>
  </div></div>;
};

export default Login;
