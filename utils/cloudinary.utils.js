require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINART_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "recipe",
    });
    console.log("File uploaded successfully", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);
    return null;
  } finally {
    fs.unlinkSync(localFilePath); 
  }
};

module.exports = uploadOnCloudinary;
