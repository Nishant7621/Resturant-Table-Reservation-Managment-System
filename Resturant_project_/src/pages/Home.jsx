import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchSection />
      <FeaturedRestaurants />
      <WhyChooseUs />
    </>
  );
};

export default Home;