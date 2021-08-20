require("dotenv").config();
const uuid = require("uuid");

let photoCache = [
  // {
  //   approved: false,
  //   cacheId: 0,
  //   cacheTime: Date.now(),
  //   created: Date.now(),
  //   photoId: 0,
  //   ref: 0,
  //   userId: 0
  // }
];

addPhotoToCache = (img) => {
  console.log(`Adding photo ${img.image.id} to cache`);
  photoCache.push({
    approved: img.image.approved,
    cacheId: uuid.v4(),
    cacheTime: Date.now(),
    created: img.image.created,
    photoId: img.image.id,
    ref: img.image.ref,
    userId: img.user.id,
    username: img.user.username
  });
};

clearCache = () => {
  photoCache = [];
};

cleanPhotoCache = () => {
  let uncached = 0;
  for (const photo of photoCache) {
    if (photo.cacheTime <= Date.now() - process.env.PHOTO_CACHE_INTERVAL) {
      photoCache = photoCache.filter((idx) => idx.cacheId !== photo.cacheId);
      uncached++;
    }
  }
  console.log(`Uncached ${uncached} photos`);
};

if (!process.env.IS_TESTING) {
  setInterval(cleanPhotoCache, process.env.PHOTO_CACHE_INTERVAL);
}

module.exports = {
  photoCache: photoCache,
  addPhotoToCache: addPhotoToCache,
  cleanPhotoCache: cleanPhotoCache,
  clearCache: clearCache
};
