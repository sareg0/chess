const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs/promises");

const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Not used. Could be used to list all games
app.get("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.send("Hello World");
});

// Create a game
app.post("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });

  console.log("POST req", req.body);
  const gameId = 2;

  try {
    fs.writeFile(`./data/${gameId}.json`, JSON.stringify(req.body));
  } catch (e) {
    console.error("error to post!:", e);
  }

  res.json({
    data: {
      id: gameId,
    },
    errors: "nothing",
  });
});

// READ: Get a game by its id
app.get("/games/:gameId", async (req, res) => {
  // console.log("request", req);
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  const gameId = req.params.gameId;
  let errors = [];
  let data;
  try {
    const raw = await fs.readFile(`./data/${gameId}.json`, "utf8");
    data = JSON.parse(raw);
    console.log("parsed data", data);
  } catch (e) {
    errors.push(e);
  }
  res.json({
    data,
    errors,
  });
});

// TODO: UPDATE a game
// TODO: DELETE a game

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
