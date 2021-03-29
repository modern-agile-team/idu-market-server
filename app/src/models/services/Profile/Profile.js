const ProfileStorage = require("./ProfileStorage");
const UserStorage = require("../User/UserStorage");
const Auth = require("../Auth/Auth");

class Profile {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async findOneById() {
    const studentId = this.params.studentId;
    // const comments = await ProfileStorage.findOneByStudentId(studentId);
    // const title = await ProfileStorage.findtitleById(studentId);
    const profile = await ProfileStorage.findOneById(studentId);
    if (profile) {
      const response = profile;
      return response;
    }
    return { success: false, msg: "아이디가 존재하지 않습니다." };
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
          return { success: true, msg: "정상적으로 수정되었습니다." };
      }
      return inspector;
    } catch (err) {
      throw err;
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
      throw err;
    }
  }
}

module.exports = Profile;
