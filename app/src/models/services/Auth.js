"use strict";

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const AuthStorage = require("./AuthStorage");
const WooahanDate = require("../utils/WooahanDate");

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
      const token = crypto.randomBytes(20).toString("hex"); // token 생성
      const user = {
        token,
        id,
      };

      const auth = await AuthStorage.findOneById(id);
      if (auth) {
        const isUpdate = await AuthStorage.updateToken(user);
        if (isUpdate) return { success: true, token };
      }

      const isSave = await AuthStorage.saveToken(user);
      if (isSave) return { success: true, token };
    } catch (err) {
      return { success: false, err };
    }
  }

  static async useableId(id) {
    const auth = await AuthStorage.findOneById(id);
    if (auth) {
      const currentDate = WooahanDate.getCurrentFullDate();
      const tokenCreatedDate = Number(auth.token_created_date);
      if (tokenCreatedDate + 300 < currentDate) {
        return {
          useable: false,
          msg: "비밀번호 변경 유효 시간(5분)이 지났습니다. 다시 시도해 주십시오.",
        };
      }
      return { useable: true };
    }
    return { useable: false, msg: "등록되지 않은 아이디 입니다." };
  }
}

module.exports = Auth;
