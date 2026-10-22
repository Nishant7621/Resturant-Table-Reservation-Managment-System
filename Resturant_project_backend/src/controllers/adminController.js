import Restaurant from "../models/Restaurant.js";

export const getRestaurantApplications = async (req, res) => {
  try {
    const status = req.query.status;
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
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      { approvalStatus: status, approvalNote: note, reviewedBy: req.user.id, reviewedAt: new Date() },
      { new: true, runValidators: true },
    ).populate("owner", "name email phone");
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant application not found" });
    }
    res.json({ success: true, message: `Restaurant ${status}`, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
