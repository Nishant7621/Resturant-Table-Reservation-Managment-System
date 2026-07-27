import express from "express";
import { registerUser, loginUser, changePassword } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Change password for the signed-in account
router.patch("/change-password", authMiddleware, changePassword);

export default router;
