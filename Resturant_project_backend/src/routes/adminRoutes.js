import express from "express";
import { getRestaurantApplications, reviewRestaurant } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("admin"));
router.get("/restaurants", getRestaurantApplications);
router.patch("/restaurants/:restaurantId/review", reviewRestaurant);

export default router;
