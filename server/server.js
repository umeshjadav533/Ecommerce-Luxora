import connectDB from "./config/mongoDB.js";
import { config } from "dotenv";
import app from './app.js'

config();

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log(`MongoDB connection Failed: ${error.message}`);
        process.exit(1);
    }
}

startServer();