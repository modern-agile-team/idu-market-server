const db = require("../../../config/db");

class PurchaseListStorage {
  //구매목록 화면
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT bo.no AS num, pu.student_id AS buyerId, st.nickname AS buyerName, bo.thumbnail, bo.title, bo.hit, 
      bo.price, cat.name AS categoryName, COUNT(cmt.content) AS commentCount
      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, bo.student_id AS sellerId,
      (SELECT nickname FROM students st where bo.student_id = st.id) AS sellerName,
      (SELECT profile_path FROM students st where bo.student_id = st.id) AS profilePath
          FROM purchase_lists pu 
          JOIN boards bo
          ON bo.no = pu.board_no 
          JOIN categories cat
          ON bo.category_no = cat.no
          JOIN students st
          ON st.id = pu.student_id
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
      const isExist = `SELECT bo.no, st.nickname
      FROM purchase_lists pu
      JOIN boards bo
      ON bo.no = board_no
      JOIN students st
      ON pu.student_id = st.id
      WHERE pu.board_no=? AND st.nickname=?`;
      const testParams = [client.boardNum, client.nickname];
      db.query(isExist, testParams, (err, rows) => {
        if (err) reject(err);
        if (!rows.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  }

  static findNicknameById(client) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT st.id
      FROM students st
      WHERE st.nickname = ?`;

      db.query(sql, [client.nickname], (err, id) => {
        if (err) reject(err);
        resolve(...id);
      });
    });
  }

  static create(student, client) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO purchase_lists(board_no, student_id) VALUES(?, ?)`;
      const params = [client.boardNum, student.id];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = PurchaseListStorage;
