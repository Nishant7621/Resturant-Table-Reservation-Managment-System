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

  return <section id="search" className="relative z-20 -mt-12 px-3">
    <div className="container-page">
      <form onSubmit={submit} className="surface rounded-[28px] p-5 sm:p-7">
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <div><p className="eyebrow">Book your table</p><h2 className="display-title mt-2 text-3xl font-bold sm:text-4xl">Where would you like to dine?</h2></div>
          <p className="text-sm text-stone-500">Search approved restaurant partners</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1fr_1fr_auto] xl:items-end">
          <label className="text-sm font-bold text-stone-700">City
            <select required value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value, area: "" })} className="input-ui mt-2 font-normal">
              <option value="">Choose city</option>{Object.keys(cityAreas).map((city) => <option key={city}>{city}</option>)}
            </select>
          </label>
          <label className="text-sm font-bold text-stone-700">Area
            <select value={form.area} onChange={(event) => update("area", event.target.value)} disabled={!form.city} className="input-ui mt-2 font-normal">
              <option value="">{form.city ? "Any area" : "Choose city first"}</option>{form.city && cityAreas[form.city].map((area) => <option key={area}>{area}</option>)}
            </select>
          </label>
          <label className="text-sm font-bold text-stone-700">Date
            <input type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(event) => update("date", event.target.value)} className="input-ui mt-2 font-normal" />
          </label>
          <label className="text-sm font-bold text-stone-700">Time
            <input type="time" value={form.time} onChange={(event) => update("time", event.target.value)} className="input-ui mt-2 font-normal" />
          </label>
          <label className="text-sm font-bold text-stone-700">Guests
            <select value={form.guests} onChange={(event) => update("guests", event.target.value)} className="input-ui mt-2 font-normal">
              {[1,2,3,4,5,6,7,8].map((guests) => <option key={guests} value={guests}>{guests} {guests === 1 ? "guest" : "guests"}</option>)}
            </select>
          </label>
          <button className="btn-primary h-[50px] px-7" type="submit">Search</button>
        </div>
      </form>
    </div>
  </section>;
}
