import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import Bookings from "./pages/Bookings";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/reservation" element={<Reservation />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
