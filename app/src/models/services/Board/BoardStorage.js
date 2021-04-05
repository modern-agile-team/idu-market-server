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
        (err, boards) => {
          if (err) reject(err);
          else resolve({ success: true, num: boards.insertId });
        }
      );
    });
  }

  static findAllByCategoryNum(categoryNum, lastNum) {
    let where = "";
    let limit = "";
    // 아래 if 문으로 Market API와 Board API를 구분짓게 된다.
    if (lastNum >= 0) {
      // req.query.lastNum (게시판 마지막 번호)가 0이면 반환 게시글 개수를 10개로 제한한다.
      limit = "LIMIT 10";
      if (lastNum > 0) {
        // req.query.lastNum (게시판 마지막 번호) 보다 게시글 번호가 작은 10개를 응답한다.
        where = "AND bo.no < ?";
      }
    }

    return new Promise((resolve, reject) => {
      const query = `SELECT bo.no AS num, st.id AS studentId, st.nickname AS nickname, st.profile_path AS profilePath, bo.thumbnail, bo.title, bo.hit, bo.price, bo.status,
      date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate,
      COUNT(cmt.content) AS commentCount
      FROM boards AS bo
      JOIN students AS st
      ON bo.student_id = st.id
      LEFT JOIN comments AS cmt
      ON bo.no = cmt.board_no
      WHERE bo.category_no = ? ${where}
      GROUP BY num
      ORDER BY num desc
      ${limit};`;

      db.query(query, [categoryNum, lastNum], (err, boards) => {
        if (err) reject(err);
        else resolve(boards);
      });
    });
  }

  static findOneByNum(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, st.name AS studentName, st.nickname, st.profile_path AS profilePath, bo.title AS title, bo.content, bo.hit AS hit, bo.price AS price, bo.status AS status,
      bo.category_no AS categoryNum, date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
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

  static findOneWatchListFlag(studentId, num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM boards bo
      JOIN watch_lists wl
      ON bo.no = wl.board_no
      WHERE wl.student_id = ? and bo.no = ?;`;
      db.query(query, [studentId, num], (err, watchList) => {
        if (err) reject(err);
        else resolve(watchList.length);
      });
    });
  }

  static updateByNum(board, num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE boards SET title = ?, content = ?, price = ? where no = ?;`;
      db.query(
        query,
        [board.title, board.content, board.price, num],
        (err, boards) => {
          if (err) reject(err);
          else resolve({ success: true, num: boards.insertId });
        }
      );
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

  static findOneHitByBoardNum(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT hit FROM boards WHERE no = ?;`;
      db.query(query, [num], (err, board) => {
        if (err) reject(err);
        else resolve(board[0].hit);
      });
    });
  }

  static updateOnlyStatusByNum(board, num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE boards SET status = ? WHERE no = ?;`;
      db.query(query, [board.status, num], (err) => {
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
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, st.profile_path AS profilePath, st.nickname, bo.thumbnail, bo.title, bo.hit, bo.price, bo.status,
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
