const multer = require("multer");
const path = require("path");
const fs = require("fs");


const uploadDir = "uploads_pdf/";

// Check if the uploads folder exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: "uploads_pdf/", // Temporary storage before uploading to Cloudinary
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDFs are allowed."), false);
  }
};

const upload_pdf = multer({ storage, fileFilter });

module.exports = upload_pdf;