import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import supabase from "../config/supabase.js";
import supabaseService from "../services/supabaseService.js";

const shouldUseSupabase = () => process.env.USE_SUPABASE === "true" || mongoose.connection.readyState !== 1;

export const getRestaurantApplications = async (req, res) => {
  try {
    const status = req.query.status;

    if (shouldUseSupabase() && supabase) {
      try {
        let query = supabase
          .from("restaurant_details")
          .select("*, customer:owner_id (id, name, email, phone)")
          .order("created_at", { ascending: false });

        if (status && ["pending", "approved", "rejected"].includes(status)) {
          query = query.eq("approval_status", status);
        }

        const { data, error } = await query;
        if (!error && data) {
          const restaurants = data.map((r) => ({
            ...r,
            _id: r.id,
            approvalStatus: r.approval_status,
            owner: r.customer ? { ...r.customer, _id: r.customer.id } : null,
          }));
          return res.json({ success: true, restaurants });
        }
      } catch (err) {
        console.warn("Supabase applications fetch error:", err.message);
      }
    }

    const query = status === "pending"
      ? { $or: [{ approvalStatus: "pending" }, { approvalStatus: { $exists: false } }] }
      : status && ["approved", "rejected"].includes(status)
        ? { approvalStatus: status }
        : {};
    const restaurants = await Restaurant.find(query)
      .populate("owner", "name email phone")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reviewRestaurant = async (req, res) => {
  try {
    const { status, note = "" } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Status must be approved or rejected" });
    }

    if (shouldUseSupabase() && supabase) {
      try {
        const restaurant = await supabaseService.updateRestaurantApproval(req.params.restaurantId, status);
        if (restaurant) {
          return res.json({ success: true, message: `Restaurant ${status}`, restaurant });
        }
      } catch (err) {
        console.warn("Supabase approval update error:", err.message);
      }
    }

    if (mongoose.Types.ObjectId.isValid(req.params.restaurantId)) {
      const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.restaurantId,
        { approvalStatus: status, approvalNote: note, reviewedBy: req.user.id, reviewedAt: new Date() },
        { new: true, runValidators: true },
      ).populate("owner", "name email phone");
      if (!restaurant) {
        return res.status(404).json({ success: false, message: "Restaurant application not found" });
      }
      return res.json({ success: true, message: `Restaurant ${status}`, restaurant });
    }

    res.status(404).json({ success: false, message: "Restaurant application not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

