const SaleListStorage = require("./SaleListStorage");
const Error = require("../../utils/Error");

class SaleList {
  constructor(body) {
    this.body = body;
  }

  async read() {
    const studentId = this.body;
    try {
      const saleLists = await SaleListStorage.findAllByStatus(studentId);
      if (saleLists.length !== 0)
        return {
          success: true,
          msg: "판매내역 조회 완료되었습니다.",
          saleLists,
        };
      return { success: false, msg: "판매내역이 존재하지 않습니다" };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

module.exports = SaleList;
