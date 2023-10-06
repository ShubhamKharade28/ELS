import mongoose from "mongoose";

// export const connectionStr = process.env.connectionStr;
export const connectionStr = 'mongodb+srv://<shubhamk28>:<Shubham1234567>@cluster0.w5z6khr.mongodb.net/ele-allot?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(connectionStr);
}

export default connectDB;