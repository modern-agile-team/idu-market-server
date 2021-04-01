const request = require("supertest");
const app = require("../../app");
const server = request(app);

const send = {
  email: "jiwonpg98@gmail.com",
  nickname: "HI",
  majorNum: 16,
};

describe("프로필", () => {
  it("GET 프로필 조회시 200 반환 ", async () => {
    try {
      const res = await server.get("/api/students/test");

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("PUT 프로필 수정 시 200번 반환", async () => {
    try {
      const res = await server.put("/api/students/test").send(send);

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("PATCH 프로필 이미지 수정 시 200 반환", async () => {
    try {
      const res = await server.patch("/api/students/test").send({
        profilePath:
          "https://woowahan-agile.s3.ap-northeast-2.amazonaws.com/profile/default.png",
      });

      expect(res.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
    }
  });
});
