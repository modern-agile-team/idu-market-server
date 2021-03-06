const ProfileStorage = require("./ProfileStorage");

class Profile {
  constructor(body) {
    this.body = body;
  }

  async findAllById() {
    const userId = this.body.studentId;
    const response = await ProfileStorage.findAllById(userId);
    if (response.profile.length) return response;
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
