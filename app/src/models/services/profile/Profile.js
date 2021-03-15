const ProfileStorage = require("./ProfileStorage");

class Profile {
  constructor(id) {
    this.id = id;
  }

  async findOneById() {
    const studentId = this.id;
    const comments = await ProfileStorage.findOneByStudentId(studentId);
    const title = await ProfileStorage.findtitleById(studentId);
    const profile = await ProfileStorage.findOneById(studentId);
    if (profile.length) {
      const response = { profile, title, comments };
      return response;
    }
    return { success: false, msg: "아이디가 존재하지 않습니다." };
  }

  async update() {
    const user = this.body;
    try {
      const response = await ProfileStorage.update(user);
      if (response) return { success: true, msg: "정상적으로 수정되었습니다." };
    } catch {
      return { success: false, msg: " 이미 존재하는 아이디 입니다." };
    }
  }
}

module.exports = Profile;
