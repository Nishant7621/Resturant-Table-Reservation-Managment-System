const Hero = ({ searchRef }) => (
  <section className="relative flex min-h-[760px] items-center overflow-hidden bg-stone-950 pt-20 text-white">
    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
    <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-stone-950/20" />
    <div className="container-page relative z-10 py-20">
      <div className="max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Trusted tables, memorable meals
        </div>
        <h1 className="display-title text-5xl font-bold sm:text-6xl lg:text-8xl">Your next great meal starts here.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-200 sm:text-xl">Explore featured restaurants, choose your time, and send a table request in minutes.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button onClick={() => searchRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn-primary px-7 py-4">Find a table <span aria-hidden="true">→</span></button>
          <a href="#how-it-works" className="inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-bold backdrop-blur transition hover:bg-white/20">How it works</a>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-9 gap-y-4 text-sm text-stone-300">
          <span><strong className="block text-xl text-white">Featured</strong> restaurant choices</span>
          <span><strong className="block text-xl text-white">Simple</strong> booking requests</span>
          <span><strong className="block text-xl text-white">Secure</strong> account access</span>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
