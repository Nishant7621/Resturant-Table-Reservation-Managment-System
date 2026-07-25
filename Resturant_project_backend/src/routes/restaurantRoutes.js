import express from "express";
import { getOwnerDashboard, getRestaurantById, getRestaurants, updateReservationStatus } from "../controllers/restaurantController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();
router.get("/", getRestaurants);
router.get("/owner/dashboard", authMiddleware, authorizeRoles("restaurant"), getOwnerDashboard);
router.patch("/owner/reservations/:reservationId", authMiddleware, authorizeRoles("restaurant"), updateReservationStatus);
router.get("/:id", getRestaurantById);
export default router;
