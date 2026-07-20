import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("customer");

  const [formData, setFormData] = useState({
    adminId: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Store JWT Token
      localStorage.setItem("token", response.data.token);

      // Store User Details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      // Redirect based on role
      if (response.data.user.role === "customer") {
        navigate("/");
      } else if (response.data.user.role === "restaurant") {
        navigate("/restaurant-dashboard");
      } else if (response.data.user.role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome to TableReserve
        </p>

        {/* Login Type */}
        <div className="flex mb-8 border rounded-lg overflow-hidden">

          <button
            type="button"
            onClick={() => setLoginType("customer")}
            className={`w-1/2 py-3 font-semibold ${
              loginType === "customer"
                ? "bg-orange-600 text-white"
                : "bg-white"
            }`}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`w-1/2 py-3 font-semibold ${
              loginType === "admin"
                ? "bg-orange-600 text-white"
                : "bg-white"
            }`}
          >
            Admin
          </button>

        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {loginType === "admin" && (
            <div>
              <label className="block mb-2 font-medium">
                Admin ID
              </label>

              <input
                type="text"
                name="adminId"
                value={formData.adminId}
                onChange={handleChange}
                placeholder="Enter Admin ID"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
          >
            {loginType === "customer"
              ? "Customer Login"
              : "Admin Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
