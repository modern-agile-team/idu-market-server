

const WatchListStorage = require("./WatchListStorage");

class WatchList {
  constructor(body) {
    this.body = body;
  }

  async update() {
    const cilent = this.body;
    try {
      const isexist = await WatchListStorage.isexist(cilent);
      if (isexist) {
        const response = await WatchListStorage.update(cilent);
        if (response) return { success: true, msg: "관심목록에 저장" };
      }
      return { success: false, msg: "이미 관심목록에 저장" };
    } catch (err) {
      return { success: false, msg: "상품이 존재하지 않습니다." };
    }
  }

  async findAllById() {
    const studentId = this.body;
    try {
      const response = await WatchListStorage.findAllById(studentId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    const product = this.body;
    try {
      const response = await WatchListStorage.delete(product);
      if (response) return { success: true, msg: "정상적으로 삭제" };
      return { success: false, msg: "이미 삭제되었습니다." };
    } catch (err) {
      return { success: false, msg: "삭제 실패" };
    }
  }
}

module.exports = WatchList;
