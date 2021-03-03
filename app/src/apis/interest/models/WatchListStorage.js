const db = require("../../../config/db");

class WatchListStorage {
  //장바구니 화면
  static showWatchList(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT bc.name, bo.title, sb.student_id 
      FROM shopping_basket sb 
      JOIN boards bo 
      ON bo.no = sb.board_no 
      JOIN board_codes bc 
      ON bc.no = sb.board_code_no 
      WHERE sb.student_id = ?`;
      db.query(sql, [id], (err, rows) => {
        if (err) reject(err);
        resolve({ success: true, rows: rows });
      });
    });
  }
  //장바구니 담는 코드
  static existWatchList(data) {
    return new Promise((resolve, reject) => {
      const isexist = `SELECT board_no, student_id FROM shopping_basket WHERE board_no=? AND student_id=?`;
      const testParams = [data.board_no, data.student_id];
      db.query(isexist, testParams, (err, rows) => {
        if (err) throw err;
        if (!rows.length) {
          resolve(this.save(data));
        } else resolve(false);
      });
    });
  }
  //장바구니에 담는 코드
  static save(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO shopping_basket(board_code_no, student_id, board_no) VALUES(?, ?, ?)`;
      const params = [data.board_code_no, data.student_id, data.board_no];
      db.query(sql, params, (err, rows) => {
        if (err) reject(false);
        resolve(true);
      });
    });
  }

  //장바구니 있는 물건 삭제
  static remove(data) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM shopping_basket WHERE board_no = ? AND student_id = ?`;
      const params = [data.board_no, data.student];
      db.query(sql, params, (err, rows) => {
        if (err) reject(false);
        resolve(true);
      });
    });
  }
}

module.exports = WatchListStorage;
