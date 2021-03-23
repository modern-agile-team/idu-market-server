const db = require("../../../config/db");

class WatchListStorage {
  //장바구니 화면
  static findAllByStudentId(studentId) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT bo.no AS num, wl.student_id AS studentId, bo.thumbnail, bo.title, bo.hit, bo.price, bo.student_id AS seller, cat.name AS categoryName,
      (SELECT  COUNT(cmt.content) FROM comments cmt WHERE wl.board_no = cmt.board_no) AS commentCount, date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate
      FROM watch_lists wl
      JOIN boards bo
      ON bo.no = wl.board_no 
      JOIN categories cat
      ON cat.no = wl.category_no
      WHERE wl.student_id = ?`;
      db.query(sql, [studentId], (err, boards) => {
        if (err) reject(err);
        resolve(boards);
      });
    });
  }
  //장바구니 담는 코드
  static isExist(studentId, watchlist) {
    return new Promise((resolve, reject) => {
      const isexist = `SELECT board_no, student_id FROM watch_lists WHERE board_no=? AND student_id=?`;
      const testParams = [watchlist.boardNum, studentId];
      db.query(isexist, testParams, (err, boards) => {
        if (err) reject(err);
        if (!boards.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  }
  //장바구니에 담는 코드
  static update(studentId, board) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO watch_lists(board_no, category_no, student_id) VALUES(?, (SELECT no FROM categories WHERE name = ?), ?)`;
      const params = [board.boardNum, board.categoryName, studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  //장바구니 있는 물건 삭제
  static delete(studentId, product) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM watch_lists WHERE board_no = ? AND student_id = ?`;
      const params = [product, studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = WatchListStorage;
