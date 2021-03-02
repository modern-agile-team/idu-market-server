const db = require("../../../config/db");

class CartStorage {
  //코드 번호
  static boardCode(code) {
    if (code === 1) return "무료나눔";
    if (code === 2) return "교재";
    if (code === 3) return "IT기기";
    if (code === 4) return "관리자 공지";
  }
  //장바구니 화면
  static showProduct(id) {
    return new Promise((resolve, reject) => {
      const category = [];
      const boardTitle = "SELECT title FROM boards WHERE shopping_basket.board_no = no";
      const sql = `SELECT student_id, board_code_no, (${boardTitle}) AS board_title FROM shopping_basket WHERE student_id = ?`;
      db.query(sql, [id], (err, rows) => {
        if (err) reject(err);
        for (let i = 0; i < rows.length; i++) {
          category.push(this.boardCode(rows[i].board_code_no));
        }
        resolve({ success: true, rows: rows, category: category, msg: "정상 검색" });
      });
    });
  }
  //장바구니 담는 코드
  static existCart(data) {
    return new Promise((resolve, reject) => {
      const existCart = `SELECT board_no, student_id FROM shopping_basket WHERE board_no=? AND student_id=?`;
      const testParams = [data.board_no, data.student_id];
      db.query(existCart, testParams, (err, rows) => {
        if (err) throw err;
        if (!rows.length) {
          resolve(this.getProduct(data));
        } else resolve({ success: false, msg: "이미 장바구니에 저장" });
      });
    });
  }
  //장바구니에 담는 코드
  static getProduct(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO shopping_basket(board_code_no, student_id, board_no) VALUES(?, ?, ?)`;
      const params = [data.board_code_no, data.student_id, data.board_no];
      console.log(data);
      db.query(sql, params, (err, rows) => {
        if (err) reject({ success: false });
        resolve({ success: true });
      });
    });
  }

  //장바구니 있는 물건 삭제
  static removeList(data) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM shopping_basket WHERE board_no = ? AND student_id = ?`;
      const params = [data.board_no, data.student];
      db.query(sql, params, (err, rows) => {
        if (err) reject({ success: false, msg: "database에 존재하지 않는다." });
        resolve({ success: true, msg: "정상적으로 삭제" });
      });
    });
  }
}

module.exports = CartStorage;
