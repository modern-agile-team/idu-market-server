"use strict";

const crypto = require("crypto");

const AuthStorage = require("./AuthStorage");

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
}

module.exports = Auth;
