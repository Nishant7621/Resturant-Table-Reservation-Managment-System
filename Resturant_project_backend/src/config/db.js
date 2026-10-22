import mongoose from "mongoose";

let isConnecting = false;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1 || isConnecting) return;

    try {
        if (!process.env.MONGO_URI) {
            console.error("⚠️ MONGO_URI is not defined in environment variables.");
            return;
        }

        isConnecting = true;
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("⚠️ MongoDB Connection Error:", error.message);
        // Do not crash the entire process so Render can boot and serve health checks
    } finally {
        isConnecting = false;
    }
};

export default connectDB;

