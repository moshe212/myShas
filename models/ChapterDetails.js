const mongoose = require("mongoose");

const ChapterDetailsSchema = new mongoose.Schema({
  TractateCounter: String,
  ChapterCounter: String,
  ChapterName: String,
  TractateName: String,
  ChapterNum: String,
  StarttOfChapter: String,
  ChapterNumberOfPages: String,
  TractateNumberOfPages: String,
  FullName: String,
  Phone: String,
  isTaken: String,
  isfullTractate: String,
  Notes: String,
});

module.exports = mongoose.model("chapterdetails", ChapterDetailsSchema);
// mongoose.model("categorys", CategorySchema);
