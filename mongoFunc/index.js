const { AddLearnDetails } = require("./AddLearnDetails.js");
const { getAllShas } = require("./getAllShas.js");

const mongoFunc = { AddLearnDetails, getAllShas };

module.exports = { mongoFunc };
