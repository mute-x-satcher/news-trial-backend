const cloudinary = require("../config/cloudinaryConfig");
const { deleteLocalFile } = require("../utils/fileUtils");

const uploadAudio = async (req, res) => {
  try {
    const name = req.body.name;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
   

    function formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    
    // Example Usage
    const formattedDate = formatDate(Date.now());
   
    // Upload audio file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video", // Cloudinary handles audio under "video"
      folder: "newspapers/audio",
      public_id: `${name}-${formattedDate}`,
    });

    // Remove temp file after upload
    deleteLocalFile(req.file.path);
    // console.log("Upload Response:", result);

    res.json({ name: result.public_id, url: result.secure_url });
  } catch (error) {
    console.error("Audio Upload Error:", error);
    res.status(500).json({ error: "Failed to upload audio" });
  }
};

const streamAudio = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "Audio URL is required" });
    }

    res.set("Content-Type", "audio/mpeg");
    res.set("Content-Disposition", "inline");
    res.redirect(url); // Redirects to Cloudinary URL for direct streaming
  } catch (error) {
    console.error("Audio Streaming Error:", error);
    res.status(500).json({ error: "Failed to stream audio" });
  }
};

module.exports = { uploadAudio, streamAudio };
