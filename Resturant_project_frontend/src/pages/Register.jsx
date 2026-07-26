import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const emptyForm = { fullName: "", restaurantName: "", ownerName: "", gstNumber: "", fssaiNumber: "", email: "", phone: "", city: "", area: "", image: "", password: "", confirmPassword: "" };

export default function Register() {
  const navigate = useNavigate(); const [accountType, setAccountType] = useState("customer"); const [form, setForm] = useState(emptyForm); const [error, setError] = useState(""); const set = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    const payload = accountType === "restaurant" ? { name: form.ownerName, email: form.email, password: form.password, role: "restaurant", restaurantName: form.restaurantName, ownerName: form.ownerName, gstNumber: form.gstNumber, fssaiNumber: form.fssaiNumber, city: form.city, area: form.area, image: form.image, phone: form.phone } : { name: form.fullName, email: form.email, password: form.password, role: "customer", phone: form.phone };
    try { const { data } = await api.post("/auth/register", payload); alert(`${data.message}. Please log in.`); navigate("/login"); } catch (requestError) { setError(requestError.response?.data?.message || "Registration failed."); }
  };
  const input = (name, label, type = "text") => <label className="block"><span className="block mb-2 font-medium">{label}</span><input required type={type} name={name} value={form[name]} onChange={set} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" /></label>;
  return <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10"><div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl"><h1 className="text-3xl font-bold text-center text-orange-600 mb-2">Create Account</h1><p className="text-center text-gray-500 mb-8">Join TableReserve as a diner or restaurant owner.</p>
    <div className="flex mb-5 border rounded-lg overflow-hidden"><button type="button" onClick={() => setAccountType("customer")} className={`w-1/2 py-3 font-semibold ${accountType === "customer" ? "bg-orange-600 text-white" : "bg-white"}`}>Customer</button><button type="button" onClick={() => setAccountType("restaurant")} className={`w-1/2 py-3 font-semibold ${accountType === "restaurant" ? "bg-orange-600 text-white" : "bg-white"}`}>Restaurant</button></div>
    {accountType === "restaurant" && <p className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">Your account can be created now, but your restaurant will not appear to customers until an administrator verifies and approves it.</p>}
    <form className="space-y-5" onSubmit={submit}>{accountType === "customer" ? <div className="grid md:grid-cols-2 gap-5">{input("fullName", "Full Name")}{input("email", "Email address", "email")}{input("phone", "Mobile number", "tel")}</div> : <><h2 className="font-bold text-xl text-gray-800">Restaurant registration</h2><div className="grid md:grid-cols-2 gap-5">{input("restaurantName", "Restaurant name")}{input("ownerName", "Owner name")}{input("gstNumber", "GST number")}{input("fssaiNumber", "FSSAI number")}{input("email", "Owner Gmail address", "email")}{input("phone", "Mobile number", "tel")}{input("city", "City")}{input("area", "Area")}</div>{input("image", "Restaurant image URL", "url")}</>}
      <div className="grid md:grid-cols-2 gap-5">{input("password", "Create password", "password")}{input("confirmPassword", "Confirm password", "password")}</div>{error && <p className="text-red-600 text-center">{error}</p>}<button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">{accountType === "restaurant" ? "Register Restaurant" : "Create Customer Account"}</button></form><p className="text-center mt-6 text-gray-600">Already have an account? <Link to="/login" className="text-orange-600 font-semibold hover:underline">Login</Link></p>
  </div></div>;
}
