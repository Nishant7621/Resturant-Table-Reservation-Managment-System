import { useRef, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import WriteReview from "../components/WriteReview";
import Footer from "../components/Footer";


const Home = () => {

  const heroRef = useRef(null);
  const searchRef = useRef(null);
  const restaurantRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);


  // store city and area
  const [searchData, setSearchData] = useState({
    city: "",
    area: ""
  });



  return (
    <>

      <Navbar
        heroRef={heroRef}
        restaurantRef={restaurantRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />


      <div ref={heroRef}>
        <Hero searchRef={searchRef} />
      </div>



      <div ref={searchRef}>
        <SearchSection 
          setSearchData={setSearchData}
        />
      </div>



      <div ref={restaurantRef}>
        <FeaturedRestaurants
          searchData={searchData}
        />
      </div>



      <div ref={aboutRef}>
        <WhyChooseUs />
      </div>


      <Reviews />

      <WriteReview />


      <div ref={contactRef}>
        <Footer />
      </div>


    </>
  );
};


export default Home;