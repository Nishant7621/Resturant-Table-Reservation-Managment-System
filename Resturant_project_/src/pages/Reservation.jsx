import { useLocation, useNavigate } from "react-router-dom";

const Reservation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const restaurant = state?.restaurant;

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">
          Restaurant Not Found
        </h2>

        <button
          onClick={() => navigate("/")}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Restaurant Image */}
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-8">

          <h1 className="text-4xl font-bold text-orange-600 mb-2">
            {restaurant.name}
          </h1>

          <p className="text-gray-600 mb-1">
            ⭐ {restaurant.rating}
          </p>

          <p className="text-gray-600 mb-1">
            🍽️ {restaurant.cuisine}
          </p>

          <p className="text-gray-600 mb-8">
            📍 {restaurant.location}
          </p>

          <h2 className="text-2xl font-semibold mb-6">
            Reservation Details
          </h2>

          <form className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-3"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              className="border rounded-lg p-3"
            />

            <select className="border rounded-lg p-3">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5 Guests</option>
              <option>6 Guests</option>
            </select>

            <input
              type="number"
              min="1"
              placeholder="Number of Tables"
              className="border rounded-lg p-3"
            />

            <select className="border rounded-lg p-3">
              <option>Select Payment Method</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Cash at Restaurant</option>
            </select>

            <textarea
              placeholder="Special Request (Optional)"
              rows="4"
              className="border rounded-lg p-3 md:col-span-2"
            ></textarea>

            {/* <div className="md:col-span-2 bg-orange-100 rounded-xl p-5">

              <h3 className="text-xl font-bold mb-4">
                Booking Summary
              </h3>

              <div className="flex justify-between mb-2">
                <span>Restaurant</span>
                <span>{restaurant.name}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Price Per Table</span>
                <span>₹500</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>GST</span>
                <span>18%</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-orange-700">
                <span>Total</span>
                <span>₹590</span>
              </div> */}

            {/* </div> */}

            <button
              type="submit"
              className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg text-lg font-semibold transition"
            >
              Confirm Reservation
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Reservation;