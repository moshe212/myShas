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
app.use(express.static(path.join(__dirname, "Client/build")));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
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
    const resulte = await models.ChapterDetails.updateMany(searchParameter, {
      $set: {
        isTaken: true,
        isfullTractate: false,
        FullName: learnName,
        Phone: learnPhone,
      },
    });
    console.log(resulte);
    res.status(200).send("OK");
  } else {
    const resulte = await models.ChapterDetails.updateOne(searchParameter, {
      $set: { isTaken: true, FullName: learnName, Phone: learnPhone },
    });
    console.log(resulte);
    const resulte2 = await models.ChapterDetails.updateMany(
      { TractateCounter: tractateCounter },
      {
        $set: { isfullTractate: false },
      }
    );
    console.log(resulte2);

    res.status(200).send("OK");
  }
});

app.post("/api/getAllShas", async (req, res) => {
  console.log(req.body);
  const data = await mongoFunc.getAllShas();
  res.status(200).send(data);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/Client/build/index.html"));
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
});
