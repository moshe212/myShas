const { models, connectDb } = require("../models");

const getAllMemories = async function () {
  try {
    const Data = await models.MemoryDetails.find();
    console.log("data", Data);

    return Data;
  } catch (error) {
    console.log(`getAllShas - error - ${error}`);
    throw error;
  }
};

module.exports = { getAllMemories };
