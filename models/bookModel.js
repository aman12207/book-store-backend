const mongoose  = require("mongoose");


const bookSchema = new mongoose.Schema({
  bookTitle :{
    type : String,
    reqired : true,
  },
  author:{
    type : String,
    reqired : true,
  }
})

module.exports = mongoose.model('Book', bookSchema);