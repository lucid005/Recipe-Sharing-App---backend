const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;

      const fileExtension = path.extname(localFilePath).toLowerCase();
      let resourceType = "auto"; 
  
      if (fileExtension === '.pdf' || fileExtension === '.doc' || fileExtension === '.docx') {
        resourceType = "raw"; 
      }
  
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: resourceType,
      });
  
      console.log("File has been uploaded to Cloudinary:", response.secure_url);
      fs.unlinkSync(localFilePath); 
  
      return response;
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      fs.unlinkSync(localFilePath); 
      return null;
    }
  };
  

module.exports = uploadOnCloudinary;