const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const name = req.body.name;

    
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      
      // Example Usage
      const formattedDate = formatDate(Date.now());


    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // Auto-detect type (recommended)
      folder: "documents/pdf",
      public_id: `${name}-${formattedDate}`,
      access_mode: "public",
    });
   
    // console.log(result); 

    fs.unlinkSync(req.file.path); // Remove temporary file after upload
    
    // const pdfUrl = result.secure_url.replace("/raw/", "/image/");

    res.json({ name: result.public_id, url: result.secure_url });
  } catch (error) {
    console.error("PDF Upload Error:", error);
    res.status(500).json({ error: "Failed to upload PDF" });
  }
};

module.exports = { uploadPDF };