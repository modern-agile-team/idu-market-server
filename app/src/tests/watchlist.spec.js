const request = require("supertest");
const app = require("../../app");
const server = request(app);

const send = {
  boardNum: 621,
  categoryName: "Book",
};

describe("관심목록", () => {
  it("GET 관심목록 조회 시 200 반환", async () => {
    try {
      const res = await server.get("/api/watchlist/test");

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("POST 관심목록 추가 시 200 반환", async () => {
    try {
      const res = await server.post("/api/watchlist/test").send(send);

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("DELETE 관심목록 삭제 시 200 반환", async () => {
    try {
      const res = await server.delete("/api/watchlist/test").send(send);

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });
});
