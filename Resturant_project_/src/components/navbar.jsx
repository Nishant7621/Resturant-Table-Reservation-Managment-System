import { useNavigate } from "react-router-dom";

export default function Navbar({
  heroRef,
  restaurantRef,
  aboutRef,
  contactRef,
}) {
  const navigate = useNavigate();

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-8">

        <h1
          onClick={() => scrollTo(heroRef)}
          className="text-3xl font-bold text-orange-600 cursor-pointer"
        >
          🍽️ TableReserve
        </h1>

        <ul className="flex gap-8 font-medium">
          <li
            onClick={() => scrollTo(heroRef)}
            className="cursor-pointer hover:text-orange-600"
          >
            Home
          </li>

          <li
            onClick={() => scrollTo(restaurantRef)}
            className="cursor-pointer hover:text-orange-600"
          >
            Restaurants
          </li>

          <li
            onClick={() => scrollTo(aboutRef)}
            className="cursor-pointer hover:text-orange-600"
          >
            About
          </li>

          <li
            onClick={() => scrollTo(contactRef)}
            className="cursor-pointer hover:text-orange-600"
          >
            Contact
          </li>
        </ul>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-orange-600 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}