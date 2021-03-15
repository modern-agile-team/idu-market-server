const SaleListStorage = require("./SaleListStorage");

class SaleList {
  constructor(body) {
    this.body = body;
  }

  async read() {
    const studentId = this.body;
    try {
      const saleLists = await SaleListStorage.findOneByStatus(studentId);
      return { success: true, saleLists };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SaleList;
