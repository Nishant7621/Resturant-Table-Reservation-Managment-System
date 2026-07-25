import Reservation from "../models/Reservation.js";
import Restaurant from "../models/Restaurant.js";


// Create Reservation
export const createReservation = async (req, res) => {

    try {

        const {
            restaurant,
            date,
            time,
            guests
        } = req.body;

        if (!restaurant || !date || !time || !Number.isInteger(Number(guests)) || Number(guests) < 1) {
            return res.status(400).json({ success: false, message: "Restaurant, date, time, and a valid guest count are required" });
        }
        const restaurantExists = await Restaurant.exists({ _id: restaurant });
        if (!restaurantExists) return res.status(404).json({ success: false, message: "Restaurant not found" });


        const reservation = await Reservation.create({

            user: req.user.id,

            restaurant,

            date,

            time,

            guests: Number(guests)

        });


        res.status(201).json({

            success: true,

            message: "Booking request sent to the restaurant",

            reservation

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// Get User Reservations
export const getMyReservations = async (req, res) => {

    try {

        const reservations = await Reservation.find({
            user: req.user.id
        })
        .populate("restaurant");


        res.status(200).json({

            success:true,

            reservations

        });


    } catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
