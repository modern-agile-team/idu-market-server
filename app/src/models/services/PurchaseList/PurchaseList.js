const error = require("../../utils/Error");
const PurchaseListStorage = require("./PurchaseListStorage");

class PurchaseList {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async read() {
    const studentId = this.params.studentId;
    try {
      const purchaseList = await PurchaseListStorage.findAllById(studentId);
      return {
        success: true,
        msg: "구매목록 조회 성공했습니다.",
        purchaseList,
      };
    } catch (err) {
      return error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async create() {
    const client = this.body;
    try {
      const isExist = await PurchaseListStorage.isExist(client);
      if (isExist) {
        const response = await PurchaseListStorage.create(client);
        if (response)
          return { success: true, msg: "구매목록에 저장되었습니다" };
      }
      return { success: false, msg: "이미 구매목록에 저장이 되었습니다." };
    } catch (err) {
      return error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

module.exports = PurchaseList;
