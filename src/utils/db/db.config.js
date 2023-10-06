import mongoose from "mongoose";

export const connectionStr = process.env.connectionStr;

const connectDB = async () => {
    await mongoose.connect(connectionStr);
}

export default connectDB;