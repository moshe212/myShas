const { models, connectDb } = require("../models");
const mongoose = require("mongoose");
const { exception } = require("console");

const UpdateLearnDetails = async function ({
  Counter,
  ChapterName,
  TractateName,
  ChapterNum,
  StarttOfChapter,
  ChapterNumberOfPages,
  TractateNumberOfPages,
  FullName,
  Phone,
  isTaken,
  Notes,
}) {
  const learn = new models.BizDetails({
    Counter,
    ChapterName,
    TractateName,
    ChapterNum,
    StarttOfChapter,
    ChapterNumberOfPages,
    TractateNumberOfPages,
    FullName,
    Phone,
    isTaken,
    Notes,
  });

  let newLearn;
  try {
    newLearn = await learn.save();

    return newLearn;
  } catch (error) {
    console.log(`AddLearn - error - ${error}`);
    throw error;
  }
};

module.exports = { UpdateLearnDetails };
