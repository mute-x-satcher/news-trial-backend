const NewsPaper = require("../models/NewsPaper");
const asyncHandler = require("express-async-handler");

const getPaper = asyncHandler(async(req,res)=>{

  const {city,language,date} = req.query;

  console.log(req.query);

  let query = {};

 

  if(city !== "all") query.city = city;
  if(language !== "all") query.language = language;
  if(date) query.date = date;


  const news_papers = await NewsPaper.find(query);  
  


  return res.status(200).json(news_papers);

}) 

const uploadPaper = asyncHandler(async (req, res) => {
  const { title, city, language, audioURL, imageURL, type ,date } = req.body;

  // console.log(req.body);

  if (!title || !city || !language || !type || !audioURL || !imageURL || !date) {
    return res.status(400).json({ error: "Please fill all fields" });
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



  try {
    await NewsPaper.create({
      title,
      city,
      language,
      type,
      date,
      audioURL,
      imageURL,
    });
    res.status(201).json({ message: "News Paper Audio Upload Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Newspaper upload failed" });
  }
});

const updatePaper = asyncHandler(async (req, res) => {
  const { title, city, language, audioURL, imageURL, type, date, id } = req.body;

  console.log(req.body);

  if (!id) {
    return res.status(400).json({ message: "ObjectId not provided" });
  }

  let set_query = {};

  if (title) set_query.title = title;
  if (city) set_query.city = city;
  if (language) set_query.language = language;
  if (type) set_query.type = type;
  if (date) set_query.date = date;
  if (audioURL) set_query.audioURL = audioURL;
  if (imageURL) set_query.imageURL = imageURL;

  // console.log(set_query);

  try {
    const result = await NewsPaper.updateOne({ _id: id }, { $set: set_query });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No updates were made" });
    }
    res.status(200).json({ message: "Newspaper was updated" });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: "Failed to update newspaper" });
  }
});

const deletePaper = asyncHandler(async (req, res) => {
  const { id } = req.query;

  // console.log(req.body);

  if (!id) {
    return res.status(400).json({ message: "ObjectId not provided" });
  }

  try {
    const deletedNews = await NewsPaper.deleteOne({ _id: id });

    if (deletedNews.deletedCount === 0) {
      return res.status(404).json({ message: "NewsPaper not found" });
    }

    res.status(200).json({
      message: "Delete operation was successful",
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: "Delete operation failed" });
  }
});

module.exports = { getPaper,uploadPaper, deletePaper, updatePaper };
