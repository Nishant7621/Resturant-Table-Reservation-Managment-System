const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center text-center px-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="max-w-3xl text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Reserve Your Perfect Table
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Discover amazing restaurants and book your favorite table in just a
          few clicks.
        </p>

        <button className="bg-orange-600 hover:bg-orange-700 transition duration-300 px-8 py-4 rounded-lg text-lg font-semibold">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Hero;