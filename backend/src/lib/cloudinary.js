import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();  //so it can run independently (once we did this in index.js)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;


