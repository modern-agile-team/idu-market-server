const PurchaseListStorage = require("./PurchaseListStorage");

class PurchaseList {
    constructor(body) {
      this.body = body;
    }

    async show() {
        const studentId = this.body;
        try {
          const response = await PurchaseListStorage.showPurchaseList(studentId);
          console.log(response);
          return response;
        } catch (err) {
          return { success: false, msg: "select 실패" };
        }
      }

}

module.exports = PurchaseList;