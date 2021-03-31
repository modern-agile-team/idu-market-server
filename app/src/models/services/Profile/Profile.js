const ProfileStorage = require("./ProfileStorage");
const UserStorage = require("../User/UserStorage");
const Auth = require("../Auth/Auth");
const Error = require("../../utils/Error");

class Profile {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async findOneById() {
    const studentId = this.params.studentId;
    // const comments = await ProfileStorage.findOneByStudentId(studentId);
    // const title = await ProfileStorage.findtitleById(studentId);
    try {
      const profile = await ProfileStorage.findOneById(studentId);
      if (profile) {
        const response = profile;
        return { success: true, profile: response };
      }
      return { sucess: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async inspectEmailAndNickName() {
    const client = this.body;
    const users = await ProfileStorage.findAllByEmailAndNickname(
      client.email,
      client.nickname
    );

    if (users.length === 0) {
      return { saveable: true };
    } else {
      for (let user of users) {
        if (user.email === client.email) {
          return { saveable: false, msg: "이미 가입된 이메일 입니다." };
        } else if (user.nickname === client.nickname)
          return { saveable: false, msg: "이미 사용되고 있는 이름 입니다." };
      }
    }
  }

  async update() {
    const user = this.body;
    const studentId = this.params.studentId;

    try {
      const inspector = await this.inspectEmailAndNickName();

      if (inspector.saveable) {
        const response = await ProfileStorage.update(user, studentId);
        if (response)
          return {
            success: true,
            email: user.email,
            nickname: user.nickname,
            majorNum: user.majorNum,
            msg: "정상적으로 수정되었습니다.",
          };
      }
      return inspector;
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async updateImage() {
    const image = this.body.profilePath;
    const studentId = this.params.studentId;
    try {
      const response = await ProfileStorage.updateImage(image, studentId);
      if (response) {
        const user = await UserStorage.findOneById(studentId);
        const jwt = await Auth.createJWT(user);
        return {
          success: true,
          msg: "정상적으로 이미지가 수정되었습니다.",
          profilePath: image,
          jwt,
        };
      }
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

module.exports = Profile;
