const db = require("../../../config/db");

class PurchaseListStorage {
  //구매목록 화면
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT pu.student_id, bo.title, bo.student_id AS seller
          FROM purchase_lists pu 
          JOIN boards bo 
          ON bo.no = pu.board_no 
          WHERE pu.student_id = ?`;
      db.query(sql, [id], (err, purchaseList) => {
        if (err) reject(err);
        else resolve(purchaseList);
      });
    });
  }

  static isExist(client) {
    return new Promise((resolve, reject) => {
      const isExist = `SELECT board_no, student_id FROM purchase_lists WHERE board_no=? AND student_id=?`;
      const testParams = [client.boardNum, client.studentId];
      db.query(isExist, testParams, (err, rows) => {
        if (err) reject(err);
        if (!rows.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  }

  static update(client) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO purchase_lists(board_no, category_no, student_id) VALUES(?, ?, ?)`;
      const params = [client.boardNum, client.categoryNum, client.studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = PurchaseListStorage;
