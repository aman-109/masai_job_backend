const mongoose = require("mongoose");

const jobs = new mongoose.Schema({
  company_name: {type:String,required:true,unique:true},
  position: { type: String, required: true},
  contract: { type: String, required: true },
  loaction:{type: String, required: true }
 
});

const Job = mongoose.model("job", jobs);

module.exports = Job;