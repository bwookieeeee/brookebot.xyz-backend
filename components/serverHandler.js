require("dotenv").config();
const uuid = require("uuid");

let serverCache = [
  // {
  //   cacheId: 0,
  //   cacheTime: Date.now(),
  //   serverName: "test server"
  // }
];

addServerToCache = (data) => {
  console.log(`Adding server ${data.server.server_name} to cache`);
  serverCache.push({
    cacheId: uuid.v4(),
    cacheTime: Date.now(),
    serverName: data.server.server_name,
    defaultChannel: data.server.settings.default_channel,
    owner: data.user.username
  });
};

cleanServerCache = () => {
  let uncached = 0;
  for (const server of serverCache) {
    if (server.cacheTime <= Date.now() - process.env.SERVER_CACHE_INTERVAL) {
      serverCache = serverCache.filter((idx) => idx.cacheId !== server.cacheId);
      uncached++;
    }
  }
  console.log(`Uncached ${uncached} server creation events`);
};

module.exports = {
  serverCache: serverCache,
  addServerToCache: addServerToCache,
  cleanServerCache: cleanServerCache
};

setInterval(cleanServerCache, process.env.SERVER_CACHE_INTERVAL);
