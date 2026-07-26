import mongoose from "mongoose";


const reservationSchema = new mongoose.Schema(
{
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },


    date:{
        type:String,
        required:true
    },


    time:{
        type:String,
        required:true
    },


    guests:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        enum: ["pending", "confirmed", "declined"],
        default:"pending"
    },

    bookingFee:{
        type:Number,
        default:50
    },

    paymentStatus: {
        type: String,
        enum: ["not_started", "created", "paid", "failed", "refunded"],
        default: "not_started",
        index: true
    },

    razorpayOrderId: {
        type: String,
        unique: true,
        sparse: true
    },

    razorpayPaymentId: {
        type: String,
        sparse: true
    },

    paidAt: {
        type: Date
    }

},
{
    timestamps:true
});


const Reservation = mongoose.model(
    "Reservation",
    reservationSchema
);


export default Reservation;
