import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "null"), []);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(user?.role === "customer");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!user || !localStorage.getItem("token")) { navigate("/login"); return; }
    if (user.role === "customer") {
      api.get("/reservations/me").then(({ data }) => setBookings(data.reservations)).catch(() => {}).finally(() => setLoading(false));
    }
  }, [navigate, user]);

  if (!user) return null;
  const dashboardPath = user.role === "admin" ? "/admin" : user.role === "restaurant" ? "/restaurant-dashboard" : "/bookings";
  const confirmed = bookings.filter((booking) => booking.status === "confirmed").length;
  const pending = bookings.filter((booking) => booking.status === "pending").length;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (passwordForm.newPassword.length < 12) {
      setPasswordError("New password must be at least 12 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setChangingPassword(true);

    try {
      const { data } = await api.patch("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordMessage(data.message);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Unable to change password right now.",
      );
    } finally {
      setChangingPassword(false);
    }
  };

  return <main className="page-shell px-4 py-10 sm:py-16">
    <div className="container-page">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-orange-600">← Back to home</Link>
      <section className="surface overflow-hidden rounded-[32px]">
        <div className="h-36 bg-[radial-gradient(circle_at_top_left,#fb923c,#c2410c_60%,#7c2d12)] sm:h-44" />
        <div className="px-5 pb-8 sm:px-10">
          <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="grid h-28 w-28 place-items-center rounded-[28px] border-4 border-white bg-stone-900 text-5xl font-bold text-white shadow-xl sm:h-32 sm:w-32">{user.name?.charAt(0).toUpperCase()}</div>
              <div className="pb-1"><span className="status-pill bg-orange-100 text-orange-800">{user.role} account</span><h1 className="display-title mt-2 text-4xl font-bold sm:text-5xl">{user.name}</h1><p className="mt-1 text-stone-500">{user.email}</p></div>
            </div>
            <button onClick={() => navigate(dashboardPath)} className="btn-primary">{user.role === "customer" ? "View my bookings" : "Open dashboard"} →</button>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <article className="rounded-3xl border border-stone-100 bg-stone-50 p-6 sm:p-8">
              <p className="eyebrow">Account details</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div><p className="text-xs font-bold uppercase tracking-wider text-stone-400">Full name</p><p className="mt-1 font-bold">{user.name}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-stone-400">Email address</p><p className="mt-1 break-all font-bold">{user.email}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-stone-400">Account type</p><p className="mt-1 capitalize font-bold">{user.role}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-stone-400">Account ID</p><p className="mt-1 truncate font-mono text-sm text-stone-600" title={user.id}>{user.id}</p></div>
              </div>
              <div className="mt-7 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-600 font-bold text-white">✓</span><div><strong>Active account</strong><p className="mt-0.5 text-emerald-700">You are securely signed in and can access your role-based features.</p></div></div>
            </article>

            <article className="rounded-3xl bg-stone-900 p-6 text-white sm:p-8">
              <p className="eyebrow !text-orange-400">{user.role === "customer" ? "Dining activity" : "Quick access"}</p>
              {user.role === "customer" ? <>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl bg-white/10 p-4"><strong className="block text-3xl">{loading ? "–" : bookings.length}</strong><span className="text-xs text-stone-400">Total</span></div><div className="rounded-2xl bg-white/10 p-4"><strong className="block text-3xl">{loading ? "–" : confirmed}</strong><span className="text-xs text-stone-400">Confirmed</span></div><div className="rounded-2xl bg-white/10 p-4"><strong className="block text-3xl">{loading ? "–" : pending}</strong><span className="text-xs text-stone-400">Pending</span></div></div>
                <Link to="/" className="mt-6 inline-flex font-bold text-orange-400 hover:text-orange-300">Discover restaurants →</Link>
              </> : <><h2 className="mt-5 text-2xl font-bold">{user.role === "admin" ? "Review restaurant applications" : "Manage table requests"}</h2><p className="mt-3 leading-7 text-stone-300">{user.role === "admin" ? "Approve trusted restaurants before they appear to customers." : "View booking requests and keep customers updated."}</p></>}
            </article>
          </div>
          <article className="mt-5 rounded-3xl border border-stone-100 bg-white p-6 sm:p-8">
            <div className="max-w-2xl">
              <p className="eyebrow">Account security</p>
              <h2 className="mt-2 text-2xl font-bold text-stone-900">Change your password</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">Use a unique password with at least 12 characters that you do not use on any other website.</p>
              <form onSubmit={handlePasswordChange} className="mt-6 grid gap-4">
                <label>
                  <span className="mb-2 block text-sm font-bold text-stone-700">Current password</span>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={passwordForm.currentPassword}
                    onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
                    className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    required
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-bold text-stone-700">New password</span>
                    <input
                      type="password"
                      autoComplete="new-password"
                      minLength={12}
                      value={passwordForm.newPassword}
                      onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
                      className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-bold text-stone-700">Confirm new password</span>
                    <input
                      type="password"
                      autoComplete="new-password"
                      minLength={12}
                      value={passwordForm.confirmPassword}
                      onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
                      className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </label>
                </div>
                {passwordError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{passwordError}</p>}
                {passwordMessage && <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{passwordMessage}</p>}
                <button type="submit" disabled={changingPassword} className="btn-primary w-fit disabled:cursor-not-allowed disabled:opacity-60">
                  {changingPassword ? "Changing password..." : "Change password"}
                </button>
              </form>
            </div>
          </article>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-6"><p className="text-sm text-stone-500">Need help? Contact support from the homepage footer.</p><button onClick={logout} className="font-bold text-red-600 hover:text-red-700">Log out</button></div>
        </div>
      </section>
    </div>
  </main>;
}
