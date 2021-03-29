const request = require("supertest");
const app = require("../../app");
const server = request(app);
const db = require("../config/db");

const board = {
  studentId: "test1",
  title: "테스트1",
  content: "테스트1",
};

describe("게시판 API 테스트", () => {
  beforeAll(async (done) => {
    await db.connect();
    done();
  });

  afterAll((done) => {
    db.end();
    done();
  });

  it("게시판 생성 시 201 반환", async (done) => {
    try {
      const res = await server.post("/api/boards/book").send(board);
      expect(res.statusCode).toEqual(201);
      done();
    } catch (err) {
      console.log(err);
    }
  });

  it("게시판 조회 200 반환", async (done) => {
    try {
      const res = await server.get("/api/boards/book");
      expect(res.statusCode).toEqual(200);
      done();
    } catch (err) {
      console.log(err);
    }
  });
});
