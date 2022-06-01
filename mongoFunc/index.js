const { AddLearnDetails } = require("./AddLearnDetails.js");
const { getAllShas } = require("./getAllShas.js");
const { getStudyDetails } = require("./getStudyDetails.js");

const mongoFunc = { AddLearnDetails, getAllShas, getStudyDetails };

module.exports = { mongoFunc };
