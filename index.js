const express = require("express");
const WebSocket = require("ws");
const uuid = require("uuid");
require("dotenv").config();

const app = express();
const server = new WebSocket.Server({ port: process.env.SOCKET_PORT });

let userList = [];

// external socket setup
const extSocket = new WebSocket(process.env.EXTERNAL_SOCKET_URL);
extSocket.on("open", () => {
  setTimeout(() => {
    console.log("Authenticating internal socket");
    extSocket.send(
      JSON.stringify({
        e: "INTERNAL_LISTENER_AUTHENTICATE",
        d: {
          key: process.env.EXTERNAL_SOCKET_INTERNAL_KEY
        }
      })
    );
  }, 2000);
});

extSocket.on("message", (event) => {
  const data = JSON.parse(event);

  switch (data.e) {
    case "userAuthenticated":
      console.log("USER AUTHENTICATED");
      addUserToCache(data.d);
      break;
    case "ROBOT_SERVER_UPDATED":
      break;
    default:
      console.log(data);
  }
});

addUserToCache = usr => {
  const alt = JSON.parse(Buffer.from(usr.alt, "base64").toString());
  const cacheId = uuid.v4();
  const cacheTime = Date.now();
  console.log(`Adding user ${usr.username} to cache as ${cacheId}`);
  userList.push({
    cacheId: cacheId,
    cacheTime:cacheTime,
    username: usr.username,
    ip: usr.ip,
    hardwareConcurrency: alt.hardwareConcurrency,
    userAgent: alt.userAgent,
    renderer: alt.renderer,
    width: alt.width,
    height: alt.height,
    internalUsernameBanned: usr.internalUsernameBanned,
    internalIpBanned: usr.internalIpBanned
  })

  // console.log(userList);
}

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
// TODO #8
// setInterval(() => {
//   cleanUserCache();
// }, process.env.USER_CACHE_INTERVAL);

cleanUserCache = () => {
  console.log("Cleaning user cache");
  for (const user of userList) {
    if (user.timestamp <= Date.now() - process.env.USER_CACHE_INTERVAL) {
      userList = userList.filter((idx) => idx.id !== user.id);
    }
  }
};

server.on("connection", (ws) => {
  ws.on("message", (msg) => {
    console.log(msg.toString());
  });
});
