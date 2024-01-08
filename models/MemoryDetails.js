const mongoose = require("mongoose");

const memoryDetailsSchema = new mongoose.Schema({
  Date: Date,
  Index: Number,
  MemoryText: String,
  Status: String,
  UserID: String,
  Notes: String,
});

module.exports = mongoose.model("memorydetails", memoryDetailsSchema);
// mongoose.model("categorys", CategorySchema);
