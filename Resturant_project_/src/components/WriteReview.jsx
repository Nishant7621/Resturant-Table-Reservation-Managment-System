export default function WriteReview() {
  return (
    <section className="py-20 bg-white">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold text-orange-600">
          Write a Review
        </h2>

        <p className="text-gray-600 mt-3">
          We'd love to hear about your dining experience.
        </p>

      </div>

      <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg p-8">

        <form className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <select className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500">

              <option>Select Restaurant</option>

              <option>Bella Italia</option>

              <option>Spice Villa</option>

              <option>Sushi World</option>

              <option>Burger Hub</option>

              <option>BBQ Nation</option>

            </select>

            <select className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500">

              <option>⭐⭐⭐⭐⭐ (5)</option>

              <option>⭐⭐⭐⭐ (4)</option>

              <option>⭐⭐⭐ (3)</option>

              <option>⭐⭐ (2)</option>

              <option>⭐ (1)</option>

            </select>

          </div>

          <textarea
            rows="6"
            placeholder="Share your dining experience..."
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Submit Review
          </button>

        </form>

      </div>

    </section>
  );
}