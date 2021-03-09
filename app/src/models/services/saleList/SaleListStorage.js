`use strict`;

const db = require("../../../config/db");

class SaleListStorage {
  //판매목록 화면
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT sa.student_id, bo.title
          FROM sale_lists sa 
          JOIN boards bo 
          ON bo.no = sa.board_no 
          WHERE sa.student_id = ?`;
      db.query(sql, [id], (err, saleList) => {
        if (err) reject(err);
        resolve({ success: true, saleList: saleList });
      });
    });
  }

  static isexist(client) {
    return new Promise((resolve, reject) => {
      const isexist = `SELECT board_no, student_id FROM sale_lists WHERE board_no=? AND student_id=?`;
      const testParams = [client.boardNum, client.studentId];
      db.query(isexist, testParams, (err, rows) => {
        if (err) throw err;
        if (!rows.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  }

  static update(client) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO sale_lists(board_no, category_no, student_id) VALUES(?, ?, ?)`;
      const params = [client.boardNum, client.categoryNum, client.studentId];
      db.query(sql, params, (err, rows) => {
        if (err) reject(false);
        resolve(true);
      });
    });
  }
}

module.exports = SaleListStorage;
