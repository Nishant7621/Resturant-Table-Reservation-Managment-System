const restaurants = [
  {
    id: 1,
    name: "Bella Italia",
    rating: "4.8",
    cuisine: "Italian",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Burger Hub",
    rating: "4.6",
    cuisine: "Fast Food",
    location: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Sushi World",
    rating: "4.9",
    cuisine: "Japanese",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Taco House",
    rating: "4.5",
    cuisine: "Mexican",
    location: "Pune",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Spice Villa",
    rating: "4.7",
    cuisine: "Indian",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Patil Restuarant",
    rating: "4.8",
    cuisine: "chicken curry",
    location: "Nagpur",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsTIxG_ileqNYAr0wJ_a5K1tZ5UjSEinQBJGH3jJZPAQ&s=10",
  },
];

const FeaturedRestaurants = () => {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Featured Restaurants
          </h2>

          <p className="text-gray-500 mt-3">
            Discover the best restaurants near you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {restaurant.name}
                </h3>

                <div className="flex justify-between text-gray-600 mb-3">
                  <span>⭐ {restaurant.rating}</span>
                  <span>{restaurant.cuisine}</span>
                </div>

                <p className="text-gray-500 mb-5">
                  📍 {restaurant.location}
                </p>

                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition">
                  Reserve Table
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;