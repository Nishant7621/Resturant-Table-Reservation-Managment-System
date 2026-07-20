import Restaurant from "../models/Restaurant.js";

export const getRestaurants = async (req, res) => {
  try {
    const query = {};
    if (req.query.city) query.city = new RegExp(`^${req.query.city}$`, "i");
    if (req.query.area) query.area = new RegExp(`^${req.query.area}$`, "i");
    if (req.query.guests) query.tables = { $gte: Math.ceil(Number(req.query.guests) / 4) };
    const restaurants = await Restaurant.find(query).sort({ rating: -1, name: 1 });
    res.json({ success: true, restaurants });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });
    res.json({ success: true, restaurant });
  } catch { res.status(400).json({ success: false, message: "Invalid restaurant id" }); }
};
