const features = [
  ["01", "Discover", "Explore restaurants by city and area, with clear cuisine and location details."],
  ["02", "Request", "Choose your date, time and party size, then send your table request."],
  ["03", "Manage", "Follow the status from your bookings page while restaurants manage requests."],
];

export default function WhyChooseUs() {
  return <section id="how-it-works" className="section-space bg-[#211b18] text-white">
    <div className="container-page">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div><p className="eyebrow !text-orange-400">Simple by design</p><h2 className="display-title mt-3 text-4xl font-bold sm:text-6xl">From craving to table in three easy steps.</h2><p className="mt-6 max-w-lg leading-7 text-stone-400">No confusing phone calls. Find approved restaurants and keep every request in one place.</p></div>
        <div className="grid gap-4 sm:grid-cols-3">{features.map(([number, title, description]) => <article key={number} className="rounded-3xl border border-white/10 bg-white/[.06] p-6"><span className="font-mono text-sm font-bold text-orange-400">{number}</span><h3 className="mt-10 text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-400">{description}</p></article>)}</div>
      </div>
    </div>
  </section>;
}
