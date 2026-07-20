import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-14 pb-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-8">

        {/* About */}
        <div>
          <h2 className="text-3xl font-bold text-orange-500 mb-4">
            🍽️ TableReserve
          </h2>

          <p className="text-gray-300 leading-7">
            Discover and reserve tables at the best restaurants in your city.
            Enjoy hassle-free dining with instant reservations.
          </p>

          <div className="flex gap-4 mt-6 text-2xl">
            <a href="#">
              <i className="fab fa-facebook hover:text-orange-500 transition"></i>
            </a>

            <a href="#">
              <i className="fab fa-instagram hover:text-orange-500 transition"></i>
            </a>

            <a href="#">
              <i className="fab fa-twitter hover:text-orange-500 transition"></i>
            </a>

            <a href="#">
              <i className="fab fa-linkedin hover:text-orange-500 transition"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li>
              <Link to="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/restaurants" className="hover:text-orange-500 transition">
                Restaurants
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-orange-500 transition">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-orange-500 transition">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>

          <h3 className="text-2xl font-semibold mb-4">
            Contact Us
          </h3>

          <div className="space-y-3 text-gray-300">

            <p>📍 New Delhi, India</p>

            <p>📞 +91 98765 43210</p>

            <p>✉️ support@tablereserve.com</p>

          </div>

        </div>

        {/* Newsletter */}
        <div>

          <h3 className="text-2xl font-semibold mb-4">
            Newsletter
          </h3>

          <p className="text-gray-300 mb-4">
            Subscribe to receive restaurant offers and updates.
          </p>

          <form className="flex flex-col gap-3">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-black outline-none"
            />

            <button
              type="submit"
              className="bg-orange-600 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>

      <hr className="border-gray-700 my-8" />

      <div className="text-center text-gray-400">
        © 2026 TableReserve. All Rights Reserved.
      </div>

    </footer>
  );
}