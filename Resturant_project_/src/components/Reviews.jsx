export default function Reviews() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-orange-600">
          What Our Customers Say
        </h2>

        <p className="text-gray-600 mt-3">
          Real experiences shared by our happy diners.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        {/* Review 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">

          <div className="flex items-center gap-4 mb-4">

            <img
              src="images/user1.jpg"
              alt="Rahul Sharma"
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <h3 className="font-bold text-lg">Rahul Sharma</h3>

              <p className="text-green-600 text-sm">
                ✔ Verified Customer
              </p>
            </div>

          </div>

          <div className="text-yellow-500 text-xl mb-3">
            ★★★★★
          </div>

          <p className="text-gray-600">
            Booking a table was quick and effortless.
            The restaurant was exactly as shown, and the
            service exceeded my expectations.
          </p>

          <div className="flex justify-between mt-5 text-sm text-gray-500">

            <span>🍽 Bella Italia</span>

            <span>📅 12 Jun 2026</span>

          </div>

        </div>

        {/* Review 2 */}

        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">

          <div className="flex items-center gap-4 mb-4">

            <img
              src="images/user2.jpg"
              alt="Priya Verma"
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <h3 className="font-bold text-lg">Priya Verma</h3>

              <p className="text-green-600 text-sm">
                ✔ Verified Customer
              </p>
            </div>

          </div>

          <div className="text-yellow-500 text-xl mb-3">
            ★★★★★
          </div>

          <p className="text-gray-600">
            I booked a table for my parents'
            anniversary. Everything was perfectly
            arranged and the reservation process was seamless.
          </p>

          <div className="flex justify-between mt-5 text-sm text-gray-500">

            <span>🍽 Spice Villa</span>

            <span>📅 18 Jun 2026</span>

          </div>

        </div>

        {/* Review 3 */}

        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">

          <div className="flex items-center gap-4 mb-4">

            <img
              src="images/user3.jpg"
              alt="Aman Gupta"
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <h3 className="font-bold text-lg">Aman Gupta</h3>

              <p className="text-green-600 text-sm">
                ✔ Verified Customer
              </p>
            </div>

          </div>

          <div className="text-yellow-500 text-xl mb-3">
            ★★★★☆
          </div>

          <p className="text-gray-600">
            Great platform with plenty of restaurant choices.
            Instant confirmation and a clean interface made
            booking very convenient.
          </p>

          <div className="flex justify-between mt-5 text-sm text-gray-500">

            <span>🍽 Sushi World</span>

            <span>📅 22 Jun 2026</span>

          </div>

        </div>

      </div>

    </section>
  );
}