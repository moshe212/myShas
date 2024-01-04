const { AddLearnDetails } = require("./AddLearnDetails.js");
const { getAllShas } = require("./getAllShas.js");
const { getStudyDetails } = require("./getStudyDetails.js");
const { getAllMemories } = require("./getAllMemories.js");

const mongoFunc = {
  AddLearnDetails,
  getAllShas,
  getStudyDetails,
  getAllMemories,
};

module.exports = { mongoFunc };
