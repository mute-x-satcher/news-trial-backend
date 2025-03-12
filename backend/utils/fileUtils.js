const fs = require("fs");

// Function to delete temporary files after uploading to Cloudinary
const deleteLocalFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Error deleting file:", err);
  });
};

module.exports = { deleteLocalFile };


