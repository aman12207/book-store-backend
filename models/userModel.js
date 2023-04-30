const mongoose  = require("mongoose");

mongoose

const userSchema = new mongoose.Schema({
  name :{
    type : String,
    required : true,
  },
  email:{
    type : String,
    required : true,
    unique : true
  },
  password :{
    type : String,
    required : true,
    select : false        // we will not get password when we retrieve data
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("User", userSchema);