`use strict`;

const db = require("../../../config/db");

class SaleListStorage {
  //판매목록 화면
  static findAllByStatus(id) {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT bo.no AS num, bo.student_id AS studentId, bo.thumbnail, bo.title, bo.hit, 
      bo.price, cat.name AS categoryName, (SELECT  COUNT(cmt.content) FROM comments cmt WHERE bo.no = cmt.board_no) AS commentCount
      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate
      FROM boards bo
      JOIN categories cat
      ON cat.no = bo.category_no
      WHERE status = 2 AND student_id = ?`;

      db.query(sql, [id], (err, saleLists) => {
        if (err) reject(err);
        else resolve(saleLists);
      });
    });
  }
}

module.exports = SaleListStorage;
