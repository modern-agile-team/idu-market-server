const WatchListStorage = require("./WatchListStorage");

class WatchList {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async update() {
    const studentId = this.params.studentId;
    const board = this.body;
    try {
      const isExist = await WatchListStorage.isExist(studentId, board);
      if (isExist) {
        const response = await WatchListStorage.update(studentId, board);
        if (response) return { success: true, msg: "관심목록에 저장" };
      }
      return { success: false, msg: "이미 관심목록에 저장" };
    } catch (err) {
      return { success: false, msg: "상품이 존재하지 않습니다." };
    }
  }

  async findAllByStudentId() {
    const studentId = this.params.studentId;
    try {
      const boards = await WatchListStorage.findAllByStudentId(studentId);
      return { success: true, msg: "관심목록 조회 성공", boards };
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    const studentId = this.params.studentId;
    const product = this.body.boardNum;

    try {
      const response = await WatchListStorage.delete(studentId, product);
      if (response) return { success: true, msg: "정상적으로 삭제" };
      return { success: false, msg: "이미 삭제되었습니다." };
    } catch (err) {
      return { success: false, msg: "삭제 실패" };
    }
  }
}

module.exports = WatchList;
