`use strict`;

const db = require("../../../config/db");

class SaleListStorage {
  //판매목록 화면
  static findAllByStatus(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT bo.no AS num, bo.student_id AS studentId, st.nickname, bo.thumbnail, bo.title, bo.hit, 
      bo.price, cat.name AS categoryName, COUNT(cmt.content) AS commentCount
      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate
      FROM boards bo
      JOIN categories cat
      ON cat.no = bo.category_no
      JOIN students st
      ON st.id = bo.student_id
      LEFT JOIN comments cmt
      ON cmt.board_no = bo.no
      WHERE status = 2 AND bo.student_id = ?
      GROUP BY bo.no
      ORDER BY bo.no desc`;

      db.query(sql, [id], (err, saleLists) => {
        if (err) reject(err);
        else resolve(saleLists);
      });
    });
  }
}

module.exports = SaleListStorage;
