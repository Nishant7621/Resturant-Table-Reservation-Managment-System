import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema(
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        sparse: true
    },
    name:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    area:{
        type:String,
        required:true
    },

    cuisine:{
        type:String,
        default:"Restaurant"
    },

    rating:{
        type:Number,
        default:0
    },

    price:{
        type:String,
        default:"₹₹"
    },

    image:{
        type:String,
        required:true
    },

    ownerName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    gstNumber: { type: String, trim: true, uppercase: true },
    fssaiNumber: { type: String, trim: true },

    tables:{
        type:Number,
        default:10
    },

    availableSlots:{
        type:[String],
        default:[
            "12:00 PM",
            "2:00 PM",
            "7:00 PM",
            "9:00 PM"
        ]
    }

},
{
    timestamps:true
});


const Restaurant = mongoose.model(
    "Restaurant",
    restaurantSchema
);


export default Restaurant;
