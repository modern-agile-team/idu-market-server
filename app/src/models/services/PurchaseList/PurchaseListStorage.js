const db = require("../../../config/db");

class PurchaseListStorage {
  //구매목록 화면
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT bo.no AS num, pu.student_id AS buyer, bo.thumbnail, bo.title, bo.hit, 
      bo.price, cat.name AS categoryName, COUNT(cmt.content) AS commentCount
      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, bo.student_id AS seller
          FROM purchase_lists pu 
          JOIN boards bo 
          ON bo.no = pu.board_no 
          JOIN categories cat
          ON bo.category_no = cat.no
          LEFT JOIN comments cmt
          ON cmt.board_no = bo.no
          WHERE pu.student_id = ?
          GROUP BY pu.no
          ORDER BY pu.no DESC`;
      db.query(sql, [id], (err, purchaseList) => {
        if (err) reject(err);
        else resolve(purchaseList);
      });
    });
  }

  static isExist(client) {
    return new Promise((resolve, reject) => {
      const isExist = `SELECT bo.no, pu.student_id FROM purchase_lists pu
      JOIN boards bo
      ON bo.no = board_no 
      WHERE pu.board_no=? AND pu.student_id=?`;
      const testParams = [client.boardNum, client.studentId];
      db.query(isExist, testParams, (err, rows) => {
        if (err) reject(err);
        if (!rows.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  }

  static create(client) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO purchase_lists(board_no, student_id) VALUES(?, ?)`;
      const params = [client.boardNum, client.studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = PurchaseListStorage;
