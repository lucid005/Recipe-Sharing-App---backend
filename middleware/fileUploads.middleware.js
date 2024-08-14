const multer = require("multer");
const path = require("path");
const sanitize_filename = require("../utils/security.utils");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../uploads/fileUploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const prefix = date.toString().slice(0, 24).split(" ").join("-");
    cb(null, sanitize_filename(prefix + "-" + file.originalname));
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
