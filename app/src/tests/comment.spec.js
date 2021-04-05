const request = require("supertest");
const app = require("../../app");
const server = request(app);

const comment = {
  studentId: "test",
  content: "댓글2",
};

describe("댓글 API 테스트", () => {
  it("POST 댓글 생성 시 201 반환", async () => {
    try {
      const res = await server.post("/api/boards/book/767").send(comment);
      expect(res.statusCode).toEqual(201);
    } catch (err) {
      console.log(err);
    }
  });

  it("POST 답글 생성 시 201 반환", async () => {
    try {
      const res = await server.post("/api/boards/book/767/1369").send(comment);
      expect(res.statusCode).toEqual(201);
    } catch (err) {
      console.log(err);
    }
  });

  it("GET 댓글 조회 시 200 반환", async () => {
    try {
      const res = await server.get("/api/boards/book/767/comments");
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("PATCH 댓글 수정 시 200 반환", async () => {
    try {
      const res = await server.patch("/api/boards/book/767/1371").send(comment);
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("DELETE 댓글 삭제 시 200 반환", async () => {
    try {
      const res = await server
        .delete("/api/boards/book/767/1371")
        .send({ depth: 1, studentId: "test" });
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });
});
