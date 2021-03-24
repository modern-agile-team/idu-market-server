const PurchaseListStorage = require("./PurchaseListStorage");

class PurchaseList {
  constructor(body) {
    this.body = body;
  }

  async read() {
    const studentId = this.body.params.studentId;
    try {
      const purchaseList = await PurchaseListStorage.findAllById(studentId);
      return { success: true, purchaseList };
    } catch (err) {
      throw err;
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
      throw err;
    }
  }
}

module.exports = PurchaseList;
