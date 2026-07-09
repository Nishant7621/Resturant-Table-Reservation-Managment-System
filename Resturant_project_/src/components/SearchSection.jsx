const SearchSection = () => {
  return (
    <section className="w-full py-20 px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Find Your Perfect Table
        </h2>

        <p className="text-gray-500 mb-12">
          Search restaurants by date, time, guests, and location.
        </p>

        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-wrap gap-5 items-end justify-between">
          {/* Date */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-left font-semibold mb-2">Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600"
            />
          </div>

          {/* Time */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-left font-semibold mb-2">Time</label>
            <input
              type="time"
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-left font-semibold mb-2">Guests</label>

            <select className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5 Guests</option>
              <option>6+ Guests</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-left font-semibold mb-2">Location</label>

            <input
              type="text"
              placeholder="Enter City"
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600"
            />
          </div>

          {/* Search Button */}
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition duration-300">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;