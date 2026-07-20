import express from "express";

import {
    createReservation,
    getMyReservations
} from "../controllers/reservationController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();



// Create new reservation
router.post(
    "/",
    authMiddleware,
    createReservation
);



// Get logged-in user reservations
router.get(
    "/me",
    authMiddleware,
    getMyReservations
);



export default router;
