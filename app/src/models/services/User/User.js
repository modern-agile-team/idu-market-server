const UserStorage = require("./UserStorage");
const Auth = require("../Auth/Auth");
const AuthStorage = require("../Auth/AuthStorage");
const Cryptor = require("../../utils/Cryptor");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;

    try {
      const user = await UserStorage.findOneById(client.id);

      if (user) {
        client.psword = await Cryptor.encryptBySalt(client.psword, user.salt);

        if (user.id === client.id && user.psword === client.psword) {
          const jwt = await Auth.createJWT(user);
          return { success: true, msg: "로그인에 성공하셨습니다.", jwt };
        }
        return { success: false, msg: "잘못된 비밀번호입니다." };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      throw err;
    }
  }

  async signup() {
    const client = this.body;

    try {
      const inspector = await this.inspectIdAndEmail();

      if (inspector.saveable) {
        const { hash, salt } = await Cryptor.encrypt(client.psword);
        client.psword = hash;
        client.salt = salt;

        const isSave = await UserStorage.save(client);
        if (isSave)
          return { success: true, msg: "회원가입이 정상 처리 되었습니다." };
      }
      return inspector;
    } catch (err) {
      throw err;
    }
  }

  async resetPassword() {
    const client = this.body;

    try {
      const authInfo = await Auth.useableId(client.id);
      if (!authInfo.useable) return authInfo;

      const isReset = await UserStorage.resetPassword(client);
      if (isReset) {
        const isDelete = await AuthStorage.delete(client.id);
        if (isDelete)
          return { success: true, msg: "비밀번호가 변경되었습니다." };
      }
    } catch (err) {
      throw err;
    }
  }

  async inspectIdAndEmail() {
    const client = this.body;

    const users = await UserStorage.findAllByIdAndEmail(
      client.id,
      client.email
    );

    if (users.length === 0) {
      return { saveable: true };
    } else {
      for (let user of users) {
        if (user.id === client.id) {
          return { saveable: false, msg: "이미 존재하는 아이디 입니다." };
        } else if (user.email === client.email)
          return { saveable: false, msg: "이미 가입된 이메일 입니다." };
      }
    }
  }

  async isExistNameAndEmail() {
    const client = this.body;

    const user = await UserStorage.findOneByEmail(client.email);
    console.log(user);
    if (user) {
      if (user.name !== client.name)
        return { isExist: false, msg: "등록되지 않은 이름 입니다." };
      else if (user.email !== client.email)
        return { isExist: false, msg: "등록되지 않은 이메일 입니다." };
      else return { isExist: true };
    }
    return { isExist: false, msg: "등록되지 않은 이름 입니다." };
  }

  async isExistIdAndEmail() {
    const client = this.body;

    const user = await UserStorage.findOneByIdAndEmail(client.id, client.email);

    if (user) {
      if (user.id !== client.id)
        return { isExist: false, msg: "등록되지 않은 아이디 입니다." };
      else if (user.email !== client.email)
        return { isExist: false, msg: "등록되지 않은 이메일 입니다." };
      else return { isExist: true };
    }
    return { isExist: false, msg: "등록되지 않은 아이디 입니다." };
  }
}

module.exports = User;
