const Hero = ({ searchRef }) => (
  <section className="relative flex min-h-[780px] items-center overflow-hidden bg-stone-950 pt-20 text-white">
    {/* Immersive layered visual backdrop */}
    <img
      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85"
      alt="Atmospheric restaurant dining room"
      className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-75 contrast-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />

    <div className="container-page relative z-10 py-24">
      <div className="max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-stone-900/70 px-4 py-2 text-xs font-bold tracking-wider uppercase text-orange-400 backdrop-blur-md shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
          </span>
          Exclusive Table Access • 4 Cities • 15 Verified Venues
        </div>

        <h1 className="display-title text-5xl font-extrabold sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
          Where Exceptional Taste Meets Effortless Hospitality.
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-stone-300 sm:text-xl">
          Discover culinary sanctuaries, heritage vegetarian bistros, and high-energy rooftop terraces in Bhopal, Indore, Nagpur, and Pune.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={() => searchRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary text-base px-8 py-4 rounded-2xl shadow-2xl"
          >
            Explore Table Availability <span aria-hidden="true" className="text-xl">→</span>
          </button>
          <a
            href="#search"
            onClick={(e) => {
              e.preventDefault();
              searchRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/20 hover:border-white/40"
          >
            Filter by City & Area
          </a>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-lg">
          <div>
            <strong className="block text-2xl sm:text-3xl font-extrabold text-white">15+</strong>
            <span className="text-xs sm:text-sm text-stone-400 font-medium">Curated Venues</span>
          </div>
          <div>
            <strong className="block text-2xl sm:text-3xl font-extrabold text-orange-400">100%</strong>
            <span className="text-xs sm:text-sm text-stone-400 font-medium">Pure Veg & Fine Dining</span>
          </div>
          <div>
            <strong className="block text-2xl sm:text-3xl font-extrabold text-emerald-400">Zero</strong>
            <span className="text-xs sm:text-sm text-stone-400 font-medium">Wait Time Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

