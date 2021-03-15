`use strict`;

const db = require("../../../config/db");

class SaleListStorage {
  //판매목록 화면
  static findOneByStatus(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT bo.thumbnail, bo.title
      FROM boards bo
      WHERE status = 2 AND student_id = ?`;

      db.query(sql, [id], (err, saleLists) => {
        if (err) reject(err);
        else resolve(saleLists);
      });
    });
  }
}

module.exports = SaleListStorage;
