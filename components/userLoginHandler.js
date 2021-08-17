require("dotenv");
const uuid = require("uuid");

/**
 * A cache of all logins in the past LOGIN_CACHE_INTERVAL milliseconds
 */
let loginCache = [
  {
    cacheId: 0,
    cacheTime: Date.now(),
    username: "test user"
  }
];

/**
 * Add Login info to loginCache. Appends unique uuid and timestamp to each login
 * event.
 *
 * @param {Object} usr  - information of the user logging in
 * @param {Object} usr.alt  - Base64 encoded JSON string of various identifiers
 * @param {String} usr.alt.hardwareConcurrency  - Number of cores on client
 * @param {Number} usr.alt.height  - height of client viewport
 * @param {String} usr.alt.renderer  - Reported GPU driver of client
 * @param {String} usr.alt.userAgent  - Client user agent
 * @param {Number} usr.alt.width  - width of client viewport
 * @param {Boolean} usr.internalIpBanned  - if client IP is banned
 * @param {Boolean} usr.internalUsernameBanned  - if client username is banned
 * @param {String} usr.ip  - IP address of client
 * @param {String} usr.username  - username of client
 */
addLoginToCache = (usr) => {
  const alt = JSON.parse(Buffer.from(usr.alt, "base64").toString());
  console.log(`Adding user ${usr.username} to cache`);
  loginCache.push({
    cacheId: uuid.v4(),
    cacheTime: Date.now(),
    hardwareConcurrency: alt.hardwareConcurrency,
    height: alt.height,
    internalIpBanned: usr.internalIpBanned,
    internalUsernameBanned: usr.internalUsernameBanned,
    ip: usr.ip,
    renderer: alt.renderer,
    userAgent: alt.userAgent,
    username: usr.username,
    width: alt.width
  });
};

/**
 * Cleans login cache of any login events older than LOGIN_CACHE_INTERVAL
 * milliseconds.
 */
cleanLoginCache = () => {
  let uncached = 0;
  for (const user of loginCache) {
    if (user.cacheTime <= Date.now() - process.env.LOGIN_CACHE_INTERVAL) {
      loginCache = loginCache.filter((idx) => idx.cacheId !== user.cacheId);
      uncached++;
    }
  }
  console.log(`Uncached ${uncached} logins`);
};

module.exports = {
  loginCache: loginCache,
  addLoginToCache: addLoginToCache,
  cleanLoginCache: cleanLoginCache
}

setInterval(cleanLoginCache, process.env.LOGIN_CACHE_INTERVAL);