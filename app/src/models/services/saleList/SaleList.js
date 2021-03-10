const SaleListStorage = require("./SaleListStorage");

class SaleList {
  constructor(body) {
    this.body = body;
  }

  async read() {
    const studentId = this.body;
    try {
      const saleList = await SaleListStorage.findAllById(studentId);
      return { success: true, saleList };
    } catch (err) {
      throw err;
    }
  }

  async update() {
    const client = this.body;
    try {
      const isExist = await SaleListStorage.isExist(client);
      if (isExist) {
        const response = await SaleListStorage.update(client);
        if (response)
          return { success: true, msg: "판매목록에 저장되었습니다" };
      }
      return { success: false, msg: "이미 판매목록에 저장이 되어있음" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SaleList;
