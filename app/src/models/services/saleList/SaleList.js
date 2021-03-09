const SaleListStorage = require("./SaleListStorage");

class SaleList {
  constructor(body) {
    this.body = body;
  }

  async find() {
    const studentId = this.body;
    try {
      const response = await SaleListStorage.find(studentId);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SaleList;
