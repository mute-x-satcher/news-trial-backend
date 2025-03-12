const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = "uploads_audio/";

// Check if the uploads folder exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}



// Configure Multer storage (temporary storage before Cloudinary upload)
const storage = multer.diskStorage({
  destination: "uploads_audio/", // Temp folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter to allow only audio formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only MP3, WAV, and OGG are allowed."), false);
  }
};

const upload_audio = multer({ storage, fileFilter });

module.exports = upload_audio;
