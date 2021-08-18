require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");

const { loginCache, addLoginToCache } = require("./components/loginHandler");
const { serverCache, addServerToCache } = require("./components/serverHandler");
const { photoCache, addPhotoToCache } = require("./components/photoHandler");

const app = express();
const server = new WebSocket.Server({ port: process.env.SOCKET_PORT });

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
    case "INTERNAL_REQUEST_IMG_APPROVAL":
      console.log("NEW PHOTO");
      addPhotoToCache(data.d);
    case "ROBOT_SERVER_UPDATED":
      break;
    default:
      console.log(data);
  }
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

app.get("/cachedLogins", (req, res) => {
  res.status(200).send({ loginCache: loginCache });
});

app.get("/cachedServers", (req, res) => {
  res.status(200).send({ serverCache: serverCache });
});

app.get("/cachedPhotos", (req, res) => {
  res.status(200).send({ photoCache: photoCache });
});

app.listen(process.env.API_PORT, () => {
  console.log("Listening", process.env.API_PORT);
});

server.on("connection", (ws) => {
  ws.on("message", (msg) => {
    console.log(msg.toString());
  });
});
