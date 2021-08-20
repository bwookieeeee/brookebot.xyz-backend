"use strict";

import uuid from "uuid";

export default class Handler {
  constructor() {
    this.cache = [];
  }

  addToCache(info) {
    info.cacheId = uuid.v4();
    info.cacheTime = Date.now();
    this.cache.push(info);
  }

  cleanCache() {
    for (const entry of cache) {
      if (entry.cacheTime <= Date.now() - process.env.CACHE_INTERVAL) {
        cache = cache.filter((idx) => idx.cacheId !== entry.cacheId);
      }
    }
  }
}
