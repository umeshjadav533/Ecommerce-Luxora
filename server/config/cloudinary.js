import dotenv from "dotenv";
dotenv.config()
import { v2 as clodinary } from 'cloudinary'

console.log(process.env.PORT);
clodinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default clodinary;