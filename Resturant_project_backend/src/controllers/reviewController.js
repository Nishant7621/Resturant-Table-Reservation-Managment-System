import Review from "../models/Review.js";
import mongoose from "mongoose";
import supabase from "../config/supabase.js";
import supabaseService from "../services/supabaseService.js";

const shouldUseSupabase = () => process.env.USE_SUPABASE === "true" || mongoose.connection.readyState !== 1;

export const getReviews = async (req, res) => {
  try {
    if (shouldUseSupabase() && supabase) {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*, customer:customer_id (id, name), restaurant_details:restaurant_id (id, name)")
          .order("created_at", { ascending: false })
          .limit(12);

        if (!error && data) {
          const reviews = data.map((r) => ({
            ...r,
            _id: r.id,
            user: r.customer ? { ...r.customer, _id: r.customer.id } : null,
            restaurant: r.restaurant_details ? { ...r.restaurant_details, _id: r.restaurant_details.id } : null,
          }));
          return res.json({ success: true, reviews });
        }
      } catch (err) {
        console.warn("Supabase reviews fetch error:", err.message);
      }
    }

    const reviews = await Review.find().populate("user", "name").populate("restaurant", "name").sort({ createdAt: -1 }).limit(12);
    res.json({ success: true, reviews });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const createReview = async (req, res) => {
  try {
    const { restaurant, rating, comment } = req.body;
    if (!restaurant || !comment || !Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) return res.status(400).json({ success: false, message: "Restaurant, rating, and review text are required" });

    if (shouldUseSupabase() && supabase) {
      try {
        const review = await supabaseService.createReview({
          customerId: req.user.id,
          restaurantId: restaurant,
          rating,
          comment,
        });
        return res.status(201).json({ success: true, message: "Review submitted", review });
      } catch (err) {
        console.warn("Supabase review submit error:", err.message);
      }
    }

    const review = await Review.create({ user: req.user.id, restaurant, rating: Number(rating), comment });
    await review.populate([{ path: "user", select: "name" }, { path: "restaurant", select: "name" }]);
    res.status(201).json({ success: true, message: "Review submitted", review });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

