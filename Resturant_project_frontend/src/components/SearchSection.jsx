import { useState } from "react";

const cityAreas = {
  Bhopal: ["MP Nagar", "Indrapuri", "Kolar Hills", "Mandideep", "New Market", "Awadhpuri", "Hoshangabad Road"],
  Indore: ["Vijay Nagar", "Palasia", "Bhawarkua", "Rau", "Scheme No. 78", "MG Road", "Sapna Sangeeta Road"],
  Nagpur: ["Dharampeth", "Sadar", "Sitabuldi", "Manish Nagar", "Wardha Road", "Pratap Nagar", "Civil Lines"],
  Pune: ["Koregaon Park", "Viman Nagar", "Baner", "Hinjewadi", "Kothrud", "Shivajinagar", "FC Road"],
};

export default function SearchSection({ setSearchData }) {
  const [form, setForm] = useState({ city: "", area: "", date: "", time: "", guests: 2 });
  const update = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const submit = (event) => {
    event.preventDefault();
    setSearchData(form);
    document.querySelector("[data-restaurants]")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectCity = (c) => {
    const updated = { ...form, city: c, area: "" };
    setForm(updated);
    setSearchData(updated);
  };

  return (
    <section id="search" className="relative z-20 -mt-14 px-3 sm:px-4">
      <div className="container-page">
        {/* City Filter Pills */}
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-extrabold uppercase tracking-widest text-stone-300 bg-stone-900/80 px-3 py-1.5 rounded-xl">
            Popular Cities
          </span>
          {Object.keys(cityAreas).map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => selectCity(city)}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition shadow-sm ${
                form.city === city
                  ? "bg-orange-600 text-white shadow-orange-500/25"
                  : "bg-white/95 text-stone-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {city}
            </button>
          ))}
          {form.city && (
            <button
              type="button"
              onClick={() => {
                const cleared = { ...form, city: "", area: "" };
                setForm(cleared);
                setSearchData(cleared);
              }}
              className="text-xs font-bold text-stone-500 hover:text-stone-800 underline ml-2"
            >
              Reset
            </button>
          )}
        </div>

        <form onSubmit={submit} className="surface rounded-[30px] p-6 sm:p-8 shadow-2xl">
          <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Instant Table Search</p>
              <h2 className="display-title mt-1.5 text-3xl font-extrabold text-stone-900 sm:text-4xl">
                Find Your Perfect Seating
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-400">
              {form.city ? `Showing listings in ${form.city}` : "Browse across all 4 major cities"}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_1.1fr_1fr_1fr_1fr_auto] xl:items-end">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
              City
              <select
                required
                value={form.city}
                onChange={(event) => update("city", event.target.value)}
                className="input-ui mt-1.5 font-semibold text-stone-900"
              >
                <option value="">Choose city</option>
                {Object.keys(cityAreas).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Neighborhood / Area
              <select
                value={form.area}
                onChange={(event) => update("area", event.target.value)}
                disabled={!form.city}
                className="input-ui mt-1.5 font-semibold text-stone-900"
              >
                <option value="">{form.city ? "All Areas" : "Select City First"}</option>
                {form.city &&
                  cityAreas[form.city].map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
              </select>
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Date
              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={form.date}
                onChange={(event) => update("date", event.target.value)}
                className="input-ui mt-1.5 font-semibold text-stone-900"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Preferred Time
              <input
                type="time"
                value={form.time}
                onChange={(event) => update("time", event.target.value)}
                className="input-ui mt-1.5 font-semibold text-stone-900"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Party Size
              <select
                value={form.guests}
                onChange={(event) => update("guests", event.target.value)}
                className="input-ui mt-1.5 font-semibold text-stone-900"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((guests) => (
                  <option key={guests} value={guests}>
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </label>

            <button className="btn-primary h-[54px] px-8 text-sm font-extrabold uppercase tracking-wider" type="submit">
              Search Tables
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
