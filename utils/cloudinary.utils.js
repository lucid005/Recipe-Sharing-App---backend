// require("dotenv").config();
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (buffer) => {
//   try {
//     const response = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { resource_type: "auto", folder: "recipe" },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );

//       stream.end(buffer);
//     });

//     console.log("File uploaded successfully:", response.url);
//     return response;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     return null;
//   }
// };

// module.exports = uploadOnCloudinary;

const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const fs = require("fs");
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  // local file path in server multer
  try {
    if (!localFilePath) return null;
    const res = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "recipe",
      use_filename: true, //use flie name in cloudinary website
    });
    // console.log(res)
    console.log("file uploaded successfully on cloudinary", res.url);
    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = uploadOnCloudinary ;
