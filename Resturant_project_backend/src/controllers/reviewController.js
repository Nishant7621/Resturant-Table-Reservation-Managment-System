import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name").populate("restaurant", "name").sort({ createdAt: -1 }).limit(12);
    res.json({ success: true, reviews });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const createReview = async (req, res) => {
  try {
    const { restaurant, rating, comment } = req.body;
    if (!restaurant || !comment || !Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) return res.status(400).json({ success: false, message: "Restaurant, rating, and review text are required" });
    const review = await Review.create({ user: req.user.id, restaurant, rating: Number(rating), comment });
    await review.populate([{ path: "user", select: "name" }, { path: "restaurant", select: "name" }]);
    res.status(201).json({ success: true, message: "Review submitted", review });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
