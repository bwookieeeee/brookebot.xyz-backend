const express = require("express");
const WebSocket = require("ws");
require("dotenv").config();

const app = express();

// Express setup
// app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("X-Powered-By", "Spite");
  next()
});

app.get("/", (req, res) => {
  res.status(200).send("hi!");
});

app.listen(process.env.API_PORT, () => {
  console.log("Listening", process.env.API_PORT);
});
