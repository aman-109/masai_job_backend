const mongoose = require("mongoose");

const users = new mongoose.Schema({
  name: {type:String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:{type:Boolean,default:false}
 
});

const User = mongoose.model("user", users);

module.exports = User;