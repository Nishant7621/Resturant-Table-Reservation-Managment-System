import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({
  heroRef,
  restaurantRef,
  aboutRef,
  contactRef,
}) {

  const navigate = useNavigate();


  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );


  useEffect(() => {

    const updateUser = () => {
      const loggedUser = localStorage.getItem("user");

      setUser(
        loggedUser ? JSON.parse(loggedUser) : null
      );
    };


    window.addEventListener(
      "storage",
      updateUser
    );


    return () => {
      window.removeEventListener(
        "storage",
        updateUser
      );
    };

  }, []);



  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };



  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");

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



        <div>


          {
            user ? (

              <div className="relative group">


                <button className="text-3xl">
                  👤
                </button>



                <div
                  className="
                  hidden
                  group-hover:block
                  absolute
                  right-0
                  top-10
                  bg-white
                  shadow-xl
                  rounded-xl
                  w-52
                  p-4
                  "
                >


                  <h3 className="font-bold text-lg">
                    {user.name}
                  </h3>


                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>


                  <hr className="my-3"/>



                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left py-2 hover:text-orange-600"
                  >
                    👤 My Profile
                  </button>



                  {user.role === "restaurant" ? (
                    <button
                      onClick={() => navigate("/restaurant-dashboard")}
                      className="block w-full text-left py-2 hover:text-orange-600"
                    >
                      Restaurant Dashboard
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/bookings")}
                      className="block w-full text-left py-2 hover:text-orange-600"
                    >
                      🍽️ My Bookings
                    </button>
                  )}



                  <button
                    onClick={() => navigate("/settings")}
                    className="block w-full text-left py-2 hover:text-orange-600"
                  >
                    ⚙️ Settings
                  </button>



                  <button
                    onClick={logout}
                    className="block w-full text-left py-2 text-red-500"
                  >
                    🚪 Logout
                  </button>


                </div>


              </div>


            ) : (


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


            )

          }


        </div>


      </div>

    </nav>

  );
}
