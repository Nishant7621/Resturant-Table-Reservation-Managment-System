import mongoose from "mongoose";

let isConnecting = false;
let retryTimer = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1 || isConnecting) return;

    try {
        if (!process.env.MONGO_URI) {
            console.warn("⚠️ MONGO_URI is not set. MongoDB Atlas connection skipped.");
            return;
        }

        isConnecting = true;
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
        if (retryTimer) {
            clearInterval(retryTimer);
            retryTimer = null;
        }
    } catch (error) {
        console.warn(`⚠️ MongoDB Atlas Warning: ${error.message}`);
        // Set up background retry so it connects as soon as Atlas whitelist is active
        if (!retryTimer && process.env.MONGO_URI) {
            retryTimer = setInterval(() => {
                if (mongoose.connection.readyState !== 1) {
                    connectDB();
                }
            }, 30000);
        }
    } finally {
        isConnecting = false;
    }
};

export default connectDB;


