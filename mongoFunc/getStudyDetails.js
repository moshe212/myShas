const { models, connectDb } = require("../models");

const getStudyDetails = async function () {
  try {
    const taken = await models.ChapterDetails.find({ isTaken: "true" });
    const notTaken = await models.ChapterDetails.find({ isTaken: "FALSE" });

    const distinctTaken = [];
    for (let i = 0; i < taken.length; i++) {
      if (!distinctTaken.includes(taken[i].TractateCounter)) {
        distinctTaken.push(taken[i].TractateCounter);
      }
    }

    const distinctNotTaken = [];
    for (let i = 0; i < notTaken.length; i++) {
      if (!distinctNotTaken.includes(notTaken[i].TractateCounter)) {
        distinctNotTaken.push(notTaken[i].TractateCounter);
      }
    }

    // console.log({ distinctTaken });
    // console.log({ distinctNotTaken });
    // console.log("data", Data);

    const takenDetailsList = taken.map((taken) => {
      const studyDetailsObj = distinctNotTaken.includes(taken.TractateCounter)
        ? {
            TractateCounter: taken.TractateCounter,
            TractateName: taken.TractateName,
            ChapterName: taken.ChapterName,
            FullName: taken.FullName,
          }
        : {
            TractateCounter: taken.TractateCounter,
            TractateName: taken.TractateName,
            FullName: taken.FullName,
          };

      return studyDetailsObj;
    });

    const uniqetakenForClient = [];
    const isFound = (tractateName) =>
      uniqetakenForClient.some((element) => {
        if (element.TractateName === tractateName) {
          return true;
        }

        return false;
      });
    for (let i = 0; i < takenDetailsList.length; i++) {
      if (takenDetailsList[i].TractateName) {
        const isExist = isFound(takenDetailsList[i].TractateName);

        if (!isExist) {
          uniqetakenForClient.push(takenDetailsList[i]);
        }
      } else {
        uniqetakenForClient.push(takenDetailsList[i]);
      }
    }

    return uniqetakenForClient;
  } catch (error) {
    console.log(`getStudyDetails - error - ${error}`);
    throw error;
  }
};

module.exports = { getStudyDetails };
