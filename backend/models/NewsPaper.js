const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
 
    title:{
        type: String,
        required: true,
    },

    city:{
        type: String,
        required: true,
    },
   
    language:{
        type: String,
        required: true
    },

    type:{
        type: String,
        required: true,
    },
    
    date:{
        type: String,
        required: true,
    },

    audioURL:{
        type: String,
        required: true,
    },

    imageURL:{
        type: String,
        required: true,
    },

    createdAt:{
      type: Date,
      default: Date.now()  
    }

})

const NewsPaper = mongoose.model("News_papers",newsSchema);

module.exports = NewsPaper;