const db = require("../../../config/db");

class WatchListStorage {
  //장바구니 화면
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT cat.name AS category, bo.title, wl.student_id, bo.student_id AS seller
      FROM watch_lists wl 
      JOIN boards bo 
      ON bo.no = wl.board_no 
      JOIN categories cat
      ON bc.no = wl.category_no 
      WHERE wl.student_id = ?`;
      db.query(sql, [id], (err, watchLists) => {
        if (err) reject(err);
        resolve(watchLists);
      });
    });
  }
  //장바구니 담는 코드
  static isexist(cilent) {
    return new Promise((resolve, reject) => {
      const isexist = `SELECT board_no, student_id FROM watch_lists WHERE board_no=? AND student_id=?`;
      const testParams = [cilent.boardNum, cilent.studentId];
      db.query(isexist, testParams, (err, rows) => {
        if (err) reject(err);
        if (!rows.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  }
  //장바구니에 담는 코드
  static update(cilent) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO watch_lists(board_no, category_no, student_id) VALUES(?, ?, ?)`;
      const params = [cilent.boardNum, cilent.categoryNum, cilent.studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  //장바구니 있는 물건 삭제
  static delete(cilent) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM watch_lists WHERE board_no = ? AND student_id = ?`;
      const params = [cilent.boardNum, cilent.studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = WatchListStorage;
