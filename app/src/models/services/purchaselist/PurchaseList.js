const PurchaseListStorage = require("./PurchaseListStorage");

class PurchaseList {
  constructor(body) {
    this.body = body;
  }

  async find() {
    const studentId = this.body;
    try {
      const response = await PurchaseListStorage.find(studentId);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PurchaseList;
