require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", process.env.MONGO_URI);
const connectDB = async()=>{

    try{
       
        await mongoose.connect(MONGO_URI);

         console.log("MongoDB connected Successfuly") 
    }
    catch(error){
        console.log(error);
        console.log("Failed to connect mongoDB");
    }
}

module.exports = connectDB;