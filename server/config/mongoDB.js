import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGOURI}/${process.env.DB_NAME}`);
    } catch (error) {
        console.log("MongoDB Database connection Error", error);
        process.exit(1);
    }
}

export default connectDB;