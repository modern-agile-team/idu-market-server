const request = require("supertest");
const app = require("../../app");
const server = request(app);

describe("구매 목록", () => {
  it("GET 검색 시 200 반환", async () => {
    try {
      const res = await server.get(
        "/api/search/?categoryName=book&content=아이폰"
      );

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });
});
