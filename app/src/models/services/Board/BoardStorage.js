"use strict";

const db = require("../../../config/db");

class BoardStroage {
  static create(num, board) {
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

  static findAllByCategoryName(categoryName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, bo.category_no AS categoryNum, ca.name, bo.title, bo.content, bo.hit, bo.price,
            date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
            FROM boards bo 
            join categories ca
            on bo.category_no = ca.no
            where ca.name = ?
            order by num;`;

      db.query(query, [categoryName], (err, boards) => {
        if (err) reject(err);
        else {
          const data = [];
          for (let board of boards) {
            data.push(board);
          }
          resolve(data);
        }
      });
    });
  }

  static findAllByIncludedTitleAndCategory(title, categoryNum) {
    return new Promise((resolve, reject) => {
      const query = `SELECT bo.student_id AS studentId, st.name AS studentName, bo.title AS title, bo.hit AS hit, bo.thumbnail AS thumbnail, bo.price AS price,  COUNT(cmt.content) AS commentCount,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
        FROM boards AS bo
        JOIN students AS st
        ON bo.student_id = st.id
        LEFT JOIN comments AS cmt
        ON bo.no = cmt.board_no
        WHERE bo.title regexp ?  AND bo.category_no = ?
        GROUP BY bo.no
        ORDER BY bo.no DESC
        LIMIT 200;`;

      db.query(query, [title, categoryNum], (err, boards) => {
        if (err) reject(err);
        else resolve(boards);
      });
    });
  }

  static findByCategoryNameAndNum(categoryName, num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, bo.category_no AS categoryNum, ca.name, bo.title, bo.content, bo.hit, bo.price,
            date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
            FROM boards bo 
            join categories ca
            on bo.category_no = ca.no
            where ca.name = ? and bo.no = ?
            order by num;`;
      db.query(query, [categoryName, num], (err, boards) => {
        if (err) reject(err);
        else resolve(boards);
      });
    });
  }

  static update(board, num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE boards SET title = ?, content = ?, update_date = current_timestamp()
            where no = ?;`;
      db.query(query, [board.title, board.content, num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static delete(num) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM boards where no = ${num}`;
      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = BoardStroage;
