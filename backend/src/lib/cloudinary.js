const cloudinary = require("cloudinary").v2;
require("dotenv").config()  //so it can run independently (once we did this in index.js)

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
    api_key: process.env.CLOUDINAR_API_KEY,
    api_secret: process.env.CLOUDINAR_API_SECRET
});

module.exports = cloudinary;


