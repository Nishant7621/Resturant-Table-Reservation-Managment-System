import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";
import restaurantRoutes from "./src/routes/restaurantRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import { handleRazorpayWebhook } from "./src/controllers/paymentController.js";


// Load Environment Variables
dotenv.config();


// Connect Database
connectDB();


// Initialize Express
const app = express();


// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), handleRazorpayWebhook);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// Routes
app.use("/api/auth", authRoutes);

app.use(
  "/api/reservations",
  reservationRoutes
);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);



// Default Route
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Restaurant Reservation Management System Backend Running 🚀",
  });

});



// Server Port
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {

  console.log(
    `✅ Server is running on http://localhost:${PORT}`
  );

});
