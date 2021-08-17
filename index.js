require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const uuid = require("uuid");

const {
  loginCache,
  addLoginToCache,
  cleanLoginCache
} = require("./components/userLoginHandler");

const app = express();
const server = new WebSocket.Server({ port: process.env.SOCKET_PORT });

let serverList = [
  {
    cacheId: 0,
    cacheTime: Date.now(),
    serverName: "testServer"
  }
];

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
      addLoginToCache(data.d);
      break;
    case "NEW_ROBOT_SERVER":
      console.log("NEW SERVER");
      addServerToCache(data.d);
      break;
    case "ROBOT_SERVER_UPDATED":
      break;
    default:
      console.log(data);
  }
});

addServerToCache = (data) => {
  const cacheId = uuid.v4();
  const cacheTime = Date.now();
  console.log(
    `Adding server ${data.server.server_name} to cache as ${cacheId}`
  );
  serverList.push({
    cacheId: cacheId,
    cacheTime: cacheTime,
    serverName: data.server.serverName,
    defaultChannel: data.server.settings.default_channel,
    owner: data.user.username
  });
};


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

app.get("/cachedLogins", (req, res) => {
  res.status(200).send({ loginCache: loginCache });
});

app.listen(process.env.API_PORT, () => {
  console.log("Listening", process.env.API_PORT);
});

cleanServerCache = () => {
  let uncached = 0;
  for (const server of serverList) {
    const oldTime = Date.now() - process.env.SERVER_CACHE_INTERVAL;
    if (server.cacheTime <= oldTime) {
      serverList = serverLIst.filter((idx) => idx.cacheId !== server.cacheId);
      uncached++;
    }
  }
  console.log(`Uncached ${uncached} server creations`);
};


server.on("connection", (ws) => {
  ws.on("message", (msg) => {
    console.log(msg.toString());
  });
});

// Once every process.env.LOGIN_CACHE_INTERVAL hours,
// delete all user reports older than said interval
setInterval(cleanLoginCache, process.env.LOGIN_CACHE_INTERVAL);
setInterval(cleanServerCache, process.env.SERVER_CACHE_INTERVAL);
