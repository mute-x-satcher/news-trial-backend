const express = require("express");
const { uploadAudio, streamAudio } = require("../controllers/audioController");
const { uploadPDF } = require("../controllers/pdfController");
const upload_audio = require("../middleware/audioMiddleware");
const upload_pdf = require("../middleware/pdfMiddleware");
const router = express.Router();

// Route for uploading audio
router.post("/audio/upload", upload_audio.single("audio"), uploadAudio);
// Route for streaming audio
router.get("/audio/stream", streamAudio);

//Route for uploading pdf
router.post("/pdf/upload", upload_pdf.single("pdf"), uploadPDF);

module.exports = router;
