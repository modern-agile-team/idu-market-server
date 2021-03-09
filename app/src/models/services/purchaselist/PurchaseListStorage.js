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

  static isexist(client) {
    return new Promise((resolve, reject) => {
      const isexist = `SELECT board_no, student_id FROM purchaselists WHERE board_no=? AND student_id=?`;
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
      const sql = `INSERT INTO purchaselists(board_no, board_code_no, student_id) VALUES(?, ?, ?)`;
      const params = [client.boardNum, client.boardCodeNum, client.studentId];
      db.query(sql, params, (err, rows) => {
        if (err) reject(false);
        resolve(true);
      });
    });
  }
}

module.exports = PurchaseListStorage;
