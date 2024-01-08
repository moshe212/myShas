const http = require("http");
const https = require("https");
const express = require("express");
// const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const server = http.createServer(app);

const { models } = require("./models");
const { mongoFunc } = require("./mongoFunc");

dotenv.config();
app.use(bodyParser.json());

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

let Mongo_Path = process.env.Mongo_Path;

function connectToDB() {
  const connection = mongoose.connect(Mongo_Path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // autoIncrement.initialize(connection);
  // ProductSchema.plugin(autoIncrement.plugin, "Product");

  return connection;
}

app.delete("/api/DeleteDraftsMemories", async (req, res) => {
  // Retrieve userID from the request body
  const userID = req.body.userID;

  // Ensure userID is provided
  if (!userID) {
    return res.status(400).send("UserID is required.");
  }

  console.log("Attempting to delete drafts for user:", userID);

  try {
    // Delete all documents with status "Draft" and the specified userID
    const result = await models.MemoryDetails.deleteMany({
      Status: "Draft", // Match documents where Status is "Draft"
      UserID: userID, // and UserID matches the provided userID
    });

    if (result.deletedCount > 0) {
      console.log(`Deleted ${result.deletedCount} draft(s) for user:`, userID);
      res.status(200).send(`Deleted ${result.deletedCount} draft(s).`);
    } else {
      console.log("No drafts found for deletion for user:", userID);
      res.status(200).send("No drafts found for deletion.");
    }
  } catch (error) {
    console.error("Error deleting drafts for user:", userID, error);
    res.status(500).send("Error deleting drafts.");
  }
});

app.post("/api/SaveMemories", async (req, res) => {
  console.log("SavingMemories", req.body);
  const data = req.body.content;
  const index = req.body.index;
  const status = req.body.status;
  const userID = req.body.userID; // Retrieve userID from the request

  try {
    // Find a document with the specified index and userID, or create a new one
    const memory = await models.MemoryDetails.findOneAndUpdate(
      { Index: index, UserID: userID }, // find a document with this index and userID
      {
        $set: {
          MemoryText: data, // update MemoryText
          Status: status, // update Status
          UserID: userID, // ensure UserID is set (for new documents)
        },
        $setOnInsert: {
          Date: new Date(), // set Date only if inserting
          Notes: "Some additional notes.", // set Notes only if inserting
        },
      },
      {
        new: true, // return the updated document
        upsert: true, // create a new document if one doesn't exist
      }
    );

    console.log("Memory updated or created for user:", userID, memory);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error saving or updating memory for user:", userID, error);
    res.status(500).send("not save on db");
  }
});

app.post("/api/getAllMemories", async (req, res) => {
  console.log("getAllMemories", req.body);

  try {
    console.log(req.body);
    const data = await mongoFunc.getAllMemories();

    res.status(200).send(data);
  } catch (error) {
    console.log("not success save chapter learnDetail on db", error);
    res.send("not save on db");
  }
});

app.post("/api/LearnRegistration", async (req, res) => {
  console.log(req.body);
  const gemara = req.body.detailsToSRV.gemara;
  const choseID = req.body.detailsToSRV.choseID;
  const id = req.body.detailsToSRV.id;
  const learnName = req.body.detailsToSRV.learnName;
  const learnPhone = req.body.detailsToSRV.learnPhone;
  const tractateCounter = req.body.detailsToSRV.tractateCounter;
  const searchParameter =
    choseID === "masechet"
      ? { TractateCounter: id.toString() }
      : choseID === "chapter"
      ? { ChapterName: gemara, ChapterCounter: id.toString() }
      : "";
  console.log(searchParameter);
  if (choseID === "masechet") {
    try {
      const resulte = await models.ChapterDetails.updateMany(searchParameter, {
        $set: {
          isTaken: true,
          isfullTractate: false,
          FullName: learnName,
          Phone: learnPhone,
        },
      });
      console.log(resulte);
      if (resulte.matchedCount > 0) {
        res.status(200).send("OK");
      } else {
        res.send("not save on db");
      }
    } catch (e) {
      console.log("not success save masechet learnDetail on db", e);
      res.send("not save on db");
    }
  } else {
    try {
      const resulte = await models.ChapterDetails.updateOne(searchParameter, {
        $set: { isTaken: true, FullName: learnName, Phone: learnPhone },
      });
      console.log(resulte);

      if (resulte.matchedCount > 0) {
        const resulte2 = await models.ChapterDetails.updateMany(
          { TractateCounter: tractateCounter },
          {
            $set: { isfullTractate: false },
          }
        );
        console.log(resulte2);
        res.status(200).send("OK");
      } else {
        res.send("not save on db");
      }
    } catch (error) {
      console.log("not success save chapter learnDetail on db", error);
      res.send("not save on db");
    }
  }
});

app.post("/api/getAllShas", async (req, res) => {
  console.log(req.body);
  const data = await mongoFunc.getAllShas();

  res.status(200).send(data);
});

app.post("/api/getStudyDetails", async (req, res) => {
  console.log(req.body);
  const studyData = await mongoFunc.getStudyDetails();
  // console.log("studyData", studyData);
  res.status(200).send(studyData);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
});
