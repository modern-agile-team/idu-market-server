`use strict`;

const db = require("../../../config/db");

class SaleListStorage {
  //판매목록 화면
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT sa.student_id, bo.title
          FROM salelists sa 
          JOIN boards bo 
          ON bo.no = sa.board_no 
          WHERE sa.student_id = ?`;
      db.query(sql, [id], (err, saleList) => {
        if (err) reject(err);
        resolve({ success: true, saleList: saleList });
      });
    });
  }
}

module.exports = SaleListStorage;
