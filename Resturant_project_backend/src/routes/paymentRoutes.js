import express from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("customer"));
router.post("/create-order", createPaymentOrder);
router.post("/verify", verifyPayment);

export default router;
