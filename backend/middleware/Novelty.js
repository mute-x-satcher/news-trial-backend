const NewsPaper = require("../models/NewsPaper");
const NewPaper = require("../models/NewsPaper");
const asyncHandler = require("express-async-handler");

const noval_middleware = asyncHandler(async (req, res, next) => {
  try {
    const { city, language, type } = req.body;
    const isExist = await NewPaper.findOne({ city, language, type });

    if (isExist) return res.status(400).json({ message: "This newspaper already exists" });

    next();
  } catch (error) {
    console.error("Error in noval_middleware:", error);
    res.status(500).json({ message: "Server error in noval_middleware" });
  }
});

const noval_url_middleware = asyncHandler(async (req, res, next) => {
  try {
    const { audioURL, imageURL } = req.body;

    const url_exists = await NewsPaper.findOne({ $or: [{ audioURL: audioURL }, { imageURL: imageURL }] });

    if (url_exists) return res.status(400).json({ message: `This URL exists in ${url_exists.city} ${url_exists.type} ${url_exists.language} news paper` });

    next();
  } catch (error) {
    console.error("Error in noval_url_middleware:", error);
    res.status(500).json({ message: "Server error in noval_url_middleware" });
  }
});

module.exports = { noval_middleware, noval_url_middleware };
