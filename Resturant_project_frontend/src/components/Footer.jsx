export default function Footer() {
  return <footer className="bg-stone-950 py-14 text-white">
    <div className="container-page">
      <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div><div className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 font-bold">T</span><h2 className="text-2xl font-extrabold">TableReserve</h2></div><p className="mt-5 max-w-md leading-7 text-stone-400">Discover approved restaurants and manage every table request from one simple account.</p></div>
        <div><h3 className="font-bold">Explore</h3><div className="mt-5 flex flex-col gap-3 text-sm text-stone-400"><a href="#search" className="hover:text-orange-400">Find restaurants</a><a href="#how-it-works" className="hover:text-orange-400">How it works</a><a href="/login" className="hover:text-orange-400">Account login</a></div></div>
        <div><h3 className="font-bold">Support</h3><address className="mt-5 flex flex-col gap-3 text-sm not-italic text-stone-400"><span>Awadhpuri, Bhopal</span><a href="tel:+919328894602" className="hover:text-orange-400">+91 93288 94602</a><a href="mailto:nishantjha203@gmail.com?subject=TableReserve%20Support" className="break-all hover:text-orange-400">nishantjha203@gmail.com</a></address></div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row"><span>© 2026 TableReserve. All rights reserved.</span><span>Made for better dining experiences.</span></div>
    </div>
  </footer>;
}
