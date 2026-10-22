import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ heroRef, restaurantRef, aboutRef, contactRef }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  useEffect(() => {
    const updateUser = () => setUser(JSON.parse(localStorage.getItem("user") || "null"));
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const scrollTo = (ref) => {
    setMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  const dashboardPath = user?.role === "admin" ? "/admin" : user?.role === "restaurant" ? "/restaurant-dashboard" : "/bookings";
  const navItems = [["Home", heroRef], ["Restaurants", restaurantRef], ["Why us", aboutRef], ["Support", contactRef]];

  return <nav className="fixed inset-x-0 top-0 z-50 border-b border-orange-950/5 bg-white/95 shadow-sm backdrop-blur-xl">
    <div className="container-page flex h-[74px] items-center justify-between">
      <button onClick={() => scrollTo(heroRef)} className="flex items-center gap-2 text-left" aria-label="TableReserve home">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-xl text-white">T</span>
        <span className="text-xl font-extrabold tracking-tight text-stone-900">Table<span className="text-orange-600">Reserve</span></span>
      </button>

      <div className="hidden items-center gap-7 lg:flex">
        {navItems.map(([label, ref]) => <button key={label} onClick={() => scrollTo(ref)} className="text-sm font-semibold text-stone-600 transition hover:text-orange-600">{label}</button>)}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        {user ? <div className="relative">
          <button onClick={() => setProfileOpen((open) => !open)} className="flex items-center gap-3 rounded-full border border-stone-200 bg-white py-1.5 pl-1.5 pr-4">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-100 font-bold text-orange-700">{user.name?.charAt(0).toUpperCase()}</span>
            <span className="max-w-28 truncate text-sm font-bold">{user.name}</span>
          </button>
          {profileOpen && <div className="surface absolute right-0 top-14 w-64 rounded-2xl p-3">
            <div className="border-b border-stone-100 px-3 pb-3"><p className="font-bold">{user.name}</p><p className="truncate text-xs text-stone-500">{user.email}</p></div>
            <button onClick={() => navigate("/profile")} className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold hover:bg-orange-50">My profile</button>
            <button onClick={() => navigate(dashboardPath)} className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold hover:bg-orange-50">{user.role === "customer" ? "My bookings" : "Dashboard"}</button>
            <button onClick={logout} className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50">Log out</button>
          </div>}
        </div> : <>
          <button onClick={() => navigate("/login")} className="btn-secondary">Log in</button>
          <button onClick={() => navigate("/register")} className="btn-primary">Create account</button>
        </>}
      </div>

      <button onClick={() => setMenuOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-xl border border-stone-200 lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
        <span className="text-2xl leading-none">{menuOpen ? "×" : "☰"}</span>
      </button>
    </div>

    {menuOpen && <div className="border-t border-stone-100 bg-white px-4 pb-5 pt-3 lg:hidden">
      <div className="container-page flex flex-col gap-1">
        {navItems.map(([label, ref]) => <button key={label} onClick={() => scrollTo(ref)} className="rounded-xl px-3 py-3 text-left font-semibold hover:bg-orange-50">{label}</button>)}
        <div className="my-2 border-t border-stone-100" />
        {user ? <>
          <p className="px-3 py-2 text-sm text-stone-500">Signed in as <strong className="text-stone-800">{user.name}</strong></p>
          <button onClick={() => navigate("/profile")} className="btn-secondary w-full">My profile</button>
          <button onClick={() => navigate(dashboardPath)} className="btn-primary w-full">{user.role === "customer" ? "My bookings" : "Open dashboard"}</button>
          <button onClick={logout} className="py-3 font-semibold text-red-600">Log out</button>
        </> : <div className="grid grid-cols-2 gap-3"><button onClick={() => navigate("/login")} className="btn-secondary">Log in</button><button onClick={() => navigate("/register")} className="btn-primary">Register</button></div>}
      </div>
    </div>}
  </nav>;
}
