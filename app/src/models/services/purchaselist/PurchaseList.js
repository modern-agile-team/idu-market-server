const PurchaseListStorage = require("./PurchaseListStorage");

class PurchaseList {
  constructor(body) {
    this.body = body;
  }

  async read() {
    const studentId = this.body;
    try {
      const purchaseList = await PurchaseListStorage.findAllById(studentId);
      return { success: true, purchaseList };
    } catch (err) {
      throw err;
    }
  }

  async update() {
    const client = this.body;
    try {
      const isexist = await PurchaseListStorage.isExist(client);
      if (isexist) {
        const response = await PurchaseListStorage.update(client);
        if (response)
          return { success: true, msg: "구매목록에 저장되었습니다" };
      }
      return { success: false, msg: "이미 구매목록에 저장이 되어있음" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PurchaseList;
