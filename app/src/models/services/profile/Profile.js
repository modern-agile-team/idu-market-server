const ProfileStorage = require("./ProfileStorage");

class Profile {
  constructor(id) {
    this.id = id;
  }

  async findAllById() {
    const userId = this.id;
    const response = await ProfileStorage.findAllById(userId);
    if (response.success) return response;
    return { success: false, msg: "서버 충돌" };
  }
}

module.exports = Profile;
