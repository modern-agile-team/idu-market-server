`use strict`;

const db = require("../../../config/db");

class SaleListStorage {
  //판매목록 화면
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT sa.student_id, bo.title
          FROM sale_lists sa 
          JOIN boards bo 
          ON bo.no = sa.board_no 
          WHERE sa.student_id = ?`;
      
      db.query(sql, [id], (err, saleLists) => {
        if (err) reject(err);
        else resolve(saleLists);
      });
    });
  }

  static isExist(client) {
    return new Promise((resolve, reject) => {
      const isExist = `SELECT board_no, student_id FROM sale_lists WHERE board_no=? AND student_id=?`;
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
      const sql = `INSERT INTO sale_lists(board_no, category_no, student_id) VALUES(?, ?, ?)`;
      const params = [client.boardNum, client.categoryNum, client.studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = SaleListStorage;
