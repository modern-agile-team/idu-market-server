`use strict`;

const db = require("../../../config/db");

class PurchaseListStorage {
  //구매목록 화면
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT pu.student_id, bo.title, bo.student_id AS seller
          FROM purchaselists pu 
          JOIN boards bo 
          ON bo.no = pu.board_no 
          WHERE pu.student_id = ?`;
      db.query(sql, [id], (err, purchaseList) => {
        if (err) reject(err);
        resolve({ success: true, purchaseList: purchaseList });
      });
    });
  }
}

module.exports = PurchaseListStorage;
