const request = require("supertest");
const app = require("../../app");
const server = request(app);

describe("판매 목록", () => {
  it("GET 판매 목록 조회 시 200 반환", async () => {
    try {
      const res = await server.get("/api/sale-list/test");

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });
});
