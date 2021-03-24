const ProfileStorage = require("./ProfileStorage");

class Profile {
  constructor(req) {
    this.id = req.params.studentId;
    this.body = req.body;
  }

  async findOneById() {
    const studentId = this.id;
    // const comments = await ProfileStorage.findOneByStudentId(studentId);
    // const title = await ProfileStorage.findtitleById(studentId);
    const profile = await ProfileStorage.findOneById(studentId);
    if (profile) {
      const response = profile;
      return response;
    }
    return { success: false, msg: "아이디가 존재하지 않습니다." };
  }

  async update() {
    const user = this.body;
    const studentId = this.id;
    try {
      const response = await ProfileStorage.update(user, studentId);
      if (response) return { success: true, msg: "정상적으로 수정되었습니다." };
    } catch {
      return { success: false, msg: "db에러: 서버 쪽에 말씀해주세요" };
    }
  }

  async updateByImage() {
    const image = this.body.profilePath;
    const student = this.id;
    try {
      const response = await ProfileStorage.updateByImage(image, student);
      if (response)
        return {
          success: true,
          msg: "정상적으로 수정되었습니다.",
          profilePath: image,
        };
    } catch {
      return {
        success: false,
        msg: " DB에서 수정 불가능 서버 쪽에 말해주세요.",
      };
    }
  }
}

module.exports = Profile;
