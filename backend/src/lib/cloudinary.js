import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();  //so it can run independently (once we did this in index.js)

// Only configure cloudinary if all required environment variables are present
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
} else {
    console.warn("Cloudinary environment variables not found. Image upload functionality will be disabled.");
}

export default cloudinary;


