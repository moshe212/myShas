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
    console.log({ distinctNotTaken });
    // console.log({ distinctTaken });
    // console.log({ distinctNotTaken });
    // console.log("data", Data);
    // console.log({ taken });
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
      // console.log({ studyDetailsObj });
      return studyDetailsObj;
    });

    const uniqetakenForClient = [];
    const checkIfIsFound = (tractateName) =>
      uniqetakenForClient.some((element) => {
        if (element.TractateName === tractateName) {
          return true;
        }

        return false;
      });

    for (let i = 0; i < takenDetailsList.length; i++) {
      // console.log(takenDetailsList[i]);

      const isExistInUniqetakenForClient = checkIfIsFound(
        takenDetailsList[i].TractateName
      );

      const isFullTaken = !distinctNotTaken.includes(
        takenDetailsList[i].TractateCounter
      );

      if (!isExistInUniqetakenForClient) {
        uniqetakenForClient.push(takenDetailsList[i]);
      } else if (!isFullTaken) {
        uniqetakenForClient.push(takenDetailsList[i]);
      }
    }
    // console.log({ uniqetakenForClient });
    return uniqetakenForClient;
  } catch (error) {
    console.log(`getStudyDetails - error - ${error}`);
    throw error;
  }
};

module.exports = { getStudyDetails };
