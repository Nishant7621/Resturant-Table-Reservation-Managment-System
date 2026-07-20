import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [registerType, setRegisterType] = useState("customer");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    restaurantName: "",
    ownerName: "",
    fssai: "",
    gst: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post(
        "/auth/register",
        {
          name:
            registerType === "customer"
              ? formData.fullName
            : formData.ownerName,

          email: formData.email,
          password: formData.password,
          role: registerType,
        }
      );

      alert(`${response.data.message}. Please log in.`);

      console.log(response.data);

      setFormData({
        fullName: "",
        restaurantName: "",
        ownerName: "",
        fssai: "",
        gst: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to start using TableReserve
        </p>

        <div className="flex mb-8 border rounded-lg overflow-hidden">

          <button
            type="button"
            onClick={() => setRegisterType("customer")}
            className={`w-1/2 py-3 font-semibold ${
              registerType === "customer"
                ? "bg-orange-600 text-white"
                : "bg-white"
            }`}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setRegisterType("restaurant")}
            className={`w-1/2 py-3 font-semibold ${
              registerType === "restaurant"
                ? "bg-orange-600 text-white"
                : "bg-white"
            }`}
          >
            Restaurant
          </button>

        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {registerType === "customer" ? (
            <>
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

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
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block mb-2 font-medium">
                  Restaurant Name
                </label>

                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  placeholder="Restaurant Name"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Owner Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Owner Name"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  FSSAI Number
                </label>

                <input
                  type="text"
                  name="fssai"
                  value={formData.fssai}
                  onChange={handleChange}
                  placeholder="Enter FSSAI Number"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  GST Number
                </label>

                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  placeholder="Enter GST Number"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

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
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Restaurant Address
                </label>

                <textarea
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Restaurant Address"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-2 font-medium">
              Create Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
          >
            {registerType === "customer"
              ? "Customer Register"
              : "Restaurant Register"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
