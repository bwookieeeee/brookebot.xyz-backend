
const {
  photoCache,
  addPhotoToCache,
  cleanPhotoCache,
} = require("../components/photoHandler");

describe("Sanity test", () => {
  test("2 + 2 = 4", () => {
    expect(2 + 2).toBe(4);
  });
});

describe("Photo Cache Handler", () => {
  // beforeAll = () => {
  //   process.env.PHOTO_CACHE_INTERVAL = 15000;
  // }
  
  beforeEach = () => {
    photoCache = [];
    jest.useFakeTimers();
  };

  afterAll = () => {
    photoCache = [];
    jest.useRealTimers();
    
  };
  test("Add photo to cache", () => {
    
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
    expect(photoCache[0]).toMatchObject({
      approved: false,
      created: 8675309,
      photoId: 0,
      ref: 0,
      userId: 0,
      username: "testUser"
    })
  });
});
