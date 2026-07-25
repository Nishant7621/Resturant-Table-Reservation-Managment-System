import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const FeaturedRestaurants = ({ searchData }) => {

  const navigate = useNavigate();


  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("/restaurants", { params: searchData });
        setRestaurants(data.restaurants);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load restaurants. Please try again.");
      } finally { setLoading(false); }
    };
    loadRestaurants();
  }, [searchData]);



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




        {
          loading ? (
            <div className="text-center text-gray-500 text-xl">Loading restaurants...</div>
          ) : error ? (
            <div className="text-center text-red-600 text-xl">{error}</div>
          ) : restaurants.length === 0 ? (

            <div className="text-center text-gray-500 text-xl">
              No restaurants found for this location.
            </div>

          ) : (


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


              {
                restaurants.map((restaurant) => (

                  <div
                    key={restaurant._id}
                    className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    overflow-hidden
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition
                    duration-300
                    "
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

                      <div className="mb-4 inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                        ₹50 reservation charge / guest
                      </div>



                      <div className="flex justify-between text-gray-600 mb-3">

                        <span>
                          ⭐ {restaurant.rating}
                        </span>


                        <span>
                          {restaurant.cuisine}
                        </span>

                      </div>




                      <p className="text-gray-500 mb-2">
                        📍 {restaurant.area}, {restaurant.city}
                      </p>



                      <p className="text-gray-500 mb-5">
                        💰 {restaurant.price}
                      </p>




                      <button

                        onClick={() =>
                          navigate("/reservation", {
                            state: { restaurant, ...searchData },
                          })
                        }

                        className="
                        w-full
                        bg-orange-600
                        hover:bg-orange-700
                        text-white
                        py-3
                        rounded-lg
                        transition
                        "

                      >

                        Reserve Table

                      </button>



                    </div>


                  </div>


                ))

              }


            </div>

          )
        }



      </div>


    </section>
  );
};


export default FeaturedRestaurants;
