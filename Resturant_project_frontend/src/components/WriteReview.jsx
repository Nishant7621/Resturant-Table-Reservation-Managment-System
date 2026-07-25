import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function WriteReview() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("");
  const [form, setForm] = useState({
    restaurant: "",
    rating: 5,
    comment: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const { data } = await api.get("/restaurants");
        setRestaurants(data.restaurants);
      } catch {
        setMessage("Unable to load cities and restaurants.");
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const cities = useMemo(
    () => [...new Set(restaurants.map((restaurant) => restaurant.city).filter(Boolean))]
      .sort((first, second) => first.localeCompare(second)),
    [restaurants]
  );

  const cityRestaurants = useMemo(
    () => restaurants
      .filter((restaurant) => restaurant.city === city)
      .sort((first, second) => first.name.localeCompare(second.name)),
    [city, restaurants]
  );

  const changeCity = (event) => {
    setCity(event.target.value);
    setForm((currentForm) => ({ ...currentForm, restaurant: "" }));
    setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) return navigate("/login");

    setMessage("");
    try {
      const { data } = await api.post("/reviews", form);
      setMessage(data.message);
      setForm({ restaurant: "", rating: 5, comment: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to submit review.");
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-12 px-6">
        <h2 className="text-4xl font-bold text-orange-600">Write a Review</h2>
        <p className="text-gray-600 mt-3">
          Select your city to quickly find the restaurant you visited.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg p-8">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="review-city" className="font-semibold text-gray-700">
                City
              </label>
              <select
                id="review-city"
                required
                value={city}
                onChange={changeCity}
                disabled={loading}
                className="border rounded-lg p-3 disabled:bg-gray-200"
              >
                <option value="">{loading ? "Loading cities..." : "Choose your city"}</option>
                {cities.map((cityName) => (
                  <option key={cityName} value={cityName}>{cityName}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="review-restaurant" className="font-semibold text-gray-700">
                Restaurant
              </label>
              <select
                id="review-restaurant"
                required
                value={form.restaurant}
                onChange={(event) => setForm({ ...form, restaurant: event.target.value })}
                disabled={!city || cityRestaurants.length === 0}
                className="border rounded-lg p-3 disabled:bg-gray-200"
              >
                <option value="">
                  {!city
                    ? "Select a city first"
                    : cityRestaurants.length
                      ? "Choose a restaurant"
                      : "No restaurants found in this city"}
                </option>
                {cityRestaurants.map((restaurant) => (
                  <option key={restaurant._id} value={restaurant._id}>
                    {restaurant.name}{restaurant.area ? ` — ${restaurant.area}` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="review-rating" className="font-semibold text-gray-700">
              Rating
            </label>
            <select
              id="review-rating"
              value={form.rating}
              onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}
              className="border rounded-lg p-3"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>{"⭐".repeat(rating)} ({rating})</option>
              ))}
            </select>
          </div>

          <textarea
            required
            rows="6"
            value={form.comment}
            onChange={(event) => setForm({ ...form, comment: event.target.value })}
            placeholder="Share your dining experience..."
            className="w-full border rounded-lg p-3"
          />

          {message && <p className="text-center text-orange-700">{message}</p>}

          <button
            type="submit"
            disabled={!city || !form.restaurant}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
}
