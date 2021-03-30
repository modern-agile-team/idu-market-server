const request = require("supertest");
const app = require("../../app");
const server = request(app);

// const board = {
//   studentId: "test1",
//   title: "테스트2",
//   content: "테스트2",
//   price: "200000",
// };

describe("게시판 API 테스트", () => {
  /*
  it("게시판 생성 시 201 반환", async () => {
    try {
      const res = await server.post("/api/boards/book").send(board);
      expect(res.statusCode).toEqual(201);
    } catch (err) {
      console.log(err);
    }
  });


  it("게시판 조회 시 200 반환", async () => {
    try {
      const res = await server.get("/api/boards/book");
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });


  it("게시판 수정 시 201 반환", async () => {
    try {
      const res = await server
        .put("/api/boards/book/760")
        .send({ title: "test2", content: "test2", price: "200000" });
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("게시판 삭제 시 200 반환", async () => {
    try {
      const res = await server.delete("/api/boards/book/763");
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("게시판 삭제 시 200 반환", async () => {
    try {
      const res = await server.delete("/api/boards/book/763");
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("게시판 조회 수 1증가 시 200 반환", async () => {
    try {
      const res = await server.patch("/api/boards/book/765");
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("상태플러그 변경 성공 시 200 반환", async () => {
    try {
      const res = await server.patch("/api/boards/book/765/1");
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });
  */
  it("댓글 생성 시 200 반환", async () => {
    try {
      const res = await server.post("/api/boards/book/765");
      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });
});
