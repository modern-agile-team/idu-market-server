const request = require("supertest");
const app = require("../../app");
const server = request(app);

const studentForLogin = {
  id: "woorim960",
  psword: "zx1zx1zx1!",
};

const student = {
  id: "test6",
  name: "테스트6",
  nickname: "별명 테스트6",
  email: "test6@test.com",
  major: 16,
  psword: "test6",
};

const studentForNewPsword = {
  id: "woorim960",
  newPsword: "zx1zx1zx1!",
};

describe("로그인 API 테스트", () => {
  it("POST 로그인 시 201 반환", async () => {
    try {
      const res = await server.post("/api/jwt").send(studentForLogin);
      expect(res.statusCode).toEqual(201);
    } catch (err) {
      console.log(err);
    }
  });
});

describe("회원가입 API 테스트", () => {
  it("POST 회원가입 시 201 반환", async () => {
    try {
      const res = await server.post("/api/student").send(student);
      expect(res.statusCode).toEqual(201);
    } catch (err) {
      console.log(err);
    }
  });
});

describe("비밀번호 변경 API 테스트", () => {
  it("PATCH 비밀번호 변경 시 200 반환", async () => {
    try {
      const res = await server.patch("/api/password").send(studentForNewPsword);
      expect(res.statusCode).toEqual(201);
    } catch (err) {
      console.log(err);
    }
  });
});
