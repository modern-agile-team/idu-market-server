const WatchListStorage = require("./WatchListStorage");
const Error = require("../../utils/Error");

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
        if (response)
          return { success: true, msg: "관심목록에 저장되었습니다." };
      }
      return { success: false, msg: "이미 관심목록에 저장되었습니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async findAllByStudentId() {
    const studentId = this.params.studentId;
    try {
      const boards = await WatchListStorage.findAllByStudentId(studentId);
      return { success: true, msg: "관심목록 조회 성공하였습니다.", boards };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async delete() {
    const studentId = this.params.studentId;
    const product = this.body.boardNum;

    try {
      const response = await WatchListStorage.delete(studentId, product);
      if (response) return { success: true, msg: "정상적으로 삭제되었습니다." };
      return { success: false, msg: "이미 삭제되었습니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

module.exports = WatchList;
