let {
  photoCache,
  addPhotoToCache,
  cleanPhotoCache,
  clearCache
} = require("../components/photoHandler");

describe("Sanity test", () => {
  test("2 + 2 = 4", () => {
    expect(2 + 2).toBe(4);
  });
});

/*
describe("Photo Cache Handler", () => {
  afterEach(() => {
    clearCache();
  });

  

  test("Clean photo cache", () => {
    clearCache();
    addPhotoToCache({
      image: {
        approved: false,
        created: Date.now(),
        id: 0,
        ref: 0
      },
      user: {
        id: 0,
        username: "e"
      }
    });
    addPhotoToCache({
      image: {
        approved: false,
        created: 0,
        id: 1,
        ref: 0
      },
      user: {
        id: 1,
        username: "f"
      }
    });
    cleanPhotoCache();
    expect(photoCache.length).toBeLessThan(2);
  });

  test("Clear photo cache", () => {
    addPhotoToCache({
      image: {
        approved: false,
        created: Date.now(),
        id: 0,
        ref: 0
      },
      user: {
        id: 0,
        username: "e"
      }
    });
    clearCache();
    console.log(photoCache)
    expect(photoCache.length).toBe(0);
  });

  test("Add photo to cache", () => {
    clearCache();
    addPhotoToCache({
      image: {
        approved: false,
        created: 8675309,
        id: 0,
        ref: 0
      },
      user: {
        id: 0,
        username: "testUser"
      }
    });
    const tmp = photoCache.pop();
    expect(tmp).toMatchObject({
      approved: false,
      created: 8675309,
      photoId: 0,
      ref: 0,
      userId: 0,
      username: "testUser"
    });
  });
});
*/