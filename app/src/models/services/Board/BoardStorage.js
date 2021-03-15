"use strict";

const db = require("../../../config/db");

class BoardStroage {
  static create(num, board) {
    if (!board.thumbnail) {
      board.thumbnail = process.env.DEFAULT_THUMBNAIL;
    }

    if (!board.price) {
      board.price = "0";
    }

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO boards (student_id, category_no, title, content, thumbnail, price) VALUES (?, ?, ?, ?, ?, ?);`;
      db.query(
        query,
        [
          board.studentId,
          num,
          board.title,
          board.content,
          board.thumbnail,
          board.price,
        ],
        (err) => {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  }

  static findAllByCategoryNum(categoryNum, lastNum) {
    let subQuery = "";
    if (lastNum) subQuery = "AND bo.no < ?";

    return new Promise((resolve, reject) => {
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, bo.thumbnail, bo.title, bo.hit, bo.price, 
      date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate,
      COUNT(cmt.content) AS commentCount
      FROM boards AS bo
      JOIN students AS st
      ON bo.student_id = st.id
      LEFT JOIN comments AS cmt
      ON bo.no = cmt.board_no
      WHERE bo.category_no = ? ${subQuery}
      GROUP BY num
      ORDER BY num desc
      LIMIT 10;`;

      db.query(query, [categoryNum, lastNum], (err, boards) => {
        if (err) reject(err);
        else resolve(boards);
      });
    });
  }

  static findOneByNum(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, st.name AS studentName, bo.title AS title, bo.content, bo.hit AS hit, bo.price AS price, 
      date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM boards AS bo
      JOIN students AS st
      ON bo.student_id = st.id
      WHERE bo.no = ?`;

      db.query(query, [num], (err, boards) => {
        if (err) reject(err);
        else resolve(boards[0]);
      });
    });
  }

  static update(board, num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE boards SET title = ?, content = ?, price = ? where no = ?;`;
      db.query(query, [board.title, board.content, board.price, num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static updateOnlyHitByNum(num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE boards SET hit = hit + 1 WHERE no = ?;`;
      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static delete(num) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM boards where no = ?`;
      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static findAllByIncludedTitleAndCategory(title, categoryNum) {
    return new Promise((resolve, reject) => {
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, bo.thumbnail, bo.title, bo.hit, bo.price, 
      date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate,
      COUNT(cmt.content) AS commentCount
      FROM boards AS bo
      JOIN students AS st
      ON bo.student_id = st.id
      LEFT JOIN comments AS cmt
      ON bo.no = cmt.board_no
      WHERE bo.title regexp ? && bo.category_no = ?
      GROUP BY num
      ORDER BY num desc;`;

      db.query(query, [title, categoryNum], (err, boards) => {
        if (err) reject(err);
        else resolve(boards);
      });
    });
  }
}

module.exports = BoardStroage;
