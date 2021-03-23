const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const AuthStorage = require("./AuthStorage");

class Auth {
  static TOKEN_INVALID = -2;
  static TOKEN_EXPIRED = -3;
  static jwtOption = {
    algorithm: "HS256",
    expiresIn: "30m",
    issuer: "wooahan agile",
  };

  static async createJWT(user) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, this.jwtOption);
  }

  static async verifyJWT(token) {
    try {
      // verify를 통해 값 decode!
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log("JWT 유효 시간이 만료되었습니다.");
        return this.TOKEN_EXPIRED;
      } else if (err.message === "invalid token") {
        console.log("유효하지 않은 JWT 입니다.");
        return this.TOKEN_INVALID;
      } else {
        console.log("유효하지 않은 JWT 입니다.");
        return this.TOKEN_INVALID;
      }
    }
  }

  static async createToken(id) {
    try {
      const token = crypto.randomBytes(30).toString("hex").slice(0, 30); // token 생성
      const user = {
        token,
        id,
      };

      const isSave = await AuthStorage.saveToken(user);
      if (isSave) return { success: true, token };
    } catch (err) {
      return { success: false, err };
    }
  }

  static async useableId(id) {
    const auth = await AuthStorage.findOneByStudentId(id);
    if (auth) {
      return {
        useable: true,
        msg: "등록된 토큰입니다.",
      };
    }
    return {
      useable: false,
      msg:
        "미등록된 토큰이거나 유효시간(20분)이 만료되었습니다. 비밀번호 찾기를 다시 시도해주십시오.",
    };
  }
}

module.exports = Auth;
