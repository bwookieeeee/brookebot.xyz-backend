const express = require("express");
const WebSocket = require("ws");
require("dotenv").config();

const app = express();

let userList = [];

// Remo socket setup
const remoSocket = new WebSocket(process.env.EXTERNAL_SOCKET_URL);
remoSocket.onopen(() => {
  remoSocket.emit(
    JSON.stringify({
      e: "INTERNAL_LISTENER_AUTHENTICATE",
      d: {
        key: process.env.EXTERNAL_SOCKET_INTERNAL_KEY
      }
    })
  );
});

// Express setup
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("X-Powered-By", "Spite");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("hi!");
});

app.listen(process.env.API_PORT, () => {
  console.log("Listening", process.env.API_PORT);
});

// Once every process.env.USER_CACHE_INTERVAL hours,
// delete all user reports older than said interval
setInterval(() => {
  cleanUserCache();
}, process.env.USER_CACHE_INTERVAL);

cleanUserCache = () => {
  for (const user of userList) {
    if (user.timestamp <= Date.now() - process.env.USER_CACHE_INTERVAL) {
      userList = userList.filter((idx) => idx.id !== user.id);
    }
  }
};
