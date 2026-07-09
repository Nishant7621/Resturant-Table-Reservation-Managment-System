import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-8">
        <h1 className="text-3xl font-bold text-orange-600">
          🍽️ TableReserve
        </h1>

        <ul className="flex gap-8 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/restaurants">Restaurants</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/Login")}
            className="px-4 py-2 border border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/Register")}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}