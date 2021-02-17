"use strict";

const crypto = require("crypto");

const AuthStorage = require("./AuthStorage");
const WooahanDate = require("../utils/WooahanDate");

class Auth {
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
          msg:
            "비밀번호 변경 유효 시간(5분)이 지났습니다. 다시 시도해 주십시오.",
        };
      }
      return { useable: true };
    }
    return { useable: false, msg: "등록되지 않은 아이디 입니다." };
  }
}

module.exports = Auth;
