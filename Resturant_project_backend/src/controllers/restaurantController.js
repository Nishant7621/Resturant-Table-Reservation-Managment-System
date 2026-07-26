import Restaurant from "../models/Restaurant.js";
import Reservation from "../models/Reservation.js";

export const getRestaurants = async (req, res) => {
  try {
    const query = { approvalStatus: "approved" };
    if (req.query.city) query.city = new RegExp(`^${req.query.city}$`, "i");
    if (req.query.area) query.area = new RegExp(`^${req.query.area}$`, "i");
    if (req.query.guests) query.tables = { $gte: Math.ceil(Number(req.query.guests) / 4) };
    const restaurants = await Restaurant.find(query).sort({ rating: -1, name: 1 });
    res.json({ success: true, restaurants });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id, approvalStatus: "approved" });
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });
    res.json({ success: true, restaurant });
  } catch { res.status(400).json({ success: false, message: "Invalid restaurant id" }); }
};

export const getOwnerDashboard = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.id });
    if (!restaurant) return res.status(404).json({ success: false, message: "No restaurant profile was found for this account" });
    const reservations = await Reservation.find({ restaurant: restaurant._id }).populate("user", "name email phone").sort({ createdAt: -1 });
    const confirmed = reservations.filter((reservation) => reservation.status === "confirmed");
    const pending = reservations.filter((reservation) => reservation.status === "pending");
    res.json({ success: true, restaurant, reservations, metrics: { totalBookings: reservations.length, pendingRequests: pending.length, confirmedBookings: confirmed.length, estimatedRevenue: confirmed.reduce((total, reservation) => total + reservation.bookingFee, 0) } });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["confirmed", "declined"].includes(status)) return res.status(400).json({ success: false, message: "Invalid reservation status" });
    const restaurant = await Restaurant.findOne({ owner: req.user.id });
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant profile not found" });
    const reservation = await Reservation.findOneAndUpdate({ _id: req.params.reservationId, restaurant: restaurant._id }, { status }, { new: true }).populate("user", "name email phone");
    if (!reservation) return res.status(404).json({ success: false, message: "Booking request not found" });
    res.json({ success: true, message: `Booking ${status}`, reservation });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
