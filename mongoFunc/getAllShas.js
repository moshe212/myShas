const { models, connectDb } = require("../models");

const getAllShas = async function () {
  try {
    const Data = await models.ChapterDetails.find({ isTaken: "FALSE" });
    // console.log("data", Data);

    return Data;
  } catch (error) {
    console.log(`getAllShas - error - ${error}`);
    throw error;
  }
};

module.exports = { getAllShas };
