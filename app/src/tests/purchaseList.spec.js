const request = require("supertest");
const app = require("../../app");
const server = request(app);

const purchase = {
  boardNum: 621,
  nickname: "gg",
};

describe("구매 목록", () => {
  it("GET 구매 목록 조회 시 200 반환", async () => {
    try {
      const res = await server.get("/api/purchase-list/test");

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("POST 구매 목록 추가 시 200 반환", async () => {
    try {
      const res = await server.post("/api/purchase-list").send(purchase);

      expect(res.statusCode).toEqual(201);
    } catch (err) {
      console.log(err);
    }
  });
});
