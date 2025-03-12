require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const adminRoute = require("./routes/adminRoute");
const fileRoute = require("./routes/fileRoutes");

app.use(cors()); // CORS policy 

const connectDB = require("./db/connectdb");
const PORT = 7777

connectDB(); // Connecting mongoDB

app.use(express.json());// Middel Ware for Parsing JSON
app.use("/admin",adminRoute);
app.use("/file",fileRoute);
// app.use("/news",newsRoute);

app.listen(PORT,()=>{console.log(`Server started on http://localhost:${PORT}`)});
