import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to reserve your favorite restaurant.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Set Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Register
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