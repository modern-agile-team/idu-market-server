const db = require("../../../../config/db");

class CommentStorage {
  static createByBoardNum(comment, boardNum) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth)
       VALUES (?, ?, ?, 0, 0);`;

      db.query(
        query,
        [comment.studentId, boardNum, comment.content, comment.depth],
        (err) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  static updateGroupNum(commentNum) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET group_no = ? WHERE no = ?`;

      db.query(query, [commentNum, commentNum], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static createReplyByGroupNum(reply, boardNum, groupNum) {
    return new Promise((resolve, rejcet) => {
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth, reply_flag) 
      VALUES (?, ?, ?, ?, 1, 0);`;

      db.query(
        query,
        [reply.studentId, boardNum, reply.content, groupNum],
        (err) => {
          if (err) rejcet(err);
          resolve(true);
        }
      );
    });
  }

  static findOneByBoardNum(boardNum) {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id AS studentId, st.name AS studentName, cmt.no AS commentNum, cmt.content AS commentContent, cmt.group_no AS commentGroupNum, 
      cmt.depth AS commentDepth, cmt.reply_flag AS commentReplyFlag, cmt.hidden_flag AS commentHiddenFlag, date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS commentInDate
      FROM comments cmt
      JOIN students AS st
      ON cmt.student_id = st.id
      LEFT JOIN boards AS bo
      ON cmt.board_no = bo.no
      WHERE cmt.board_no = ?
      ORDER BY commentGroupNum, commentInDate;`;

      db.query(query, [boardNum], (err, comment) => {
        if (err) reject(err);
        resolve(comment);
      });
    });
  }

  static findOneCommentNum() {
    return new Promise((resolve, reject) => {
      const query = `SELECT no FROM comments ORDER BY no DESC LIMIT 1`;

      db.query(query, (err, commentNum) => {
        if (err) reject(err);
        resolve(commentNum);
      });
    });
  }

  static updateComment(commentNum) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET reply_flag = 1
      WHERE no = ?;`;

      db.query(query, [commentNum], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  static updateByNum(comment, num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET content = ? WHERE no = ?;`;

      db.query(query, [comment.content, num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static findOneReplyFlag(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT reply_flag AS num FROM comments WHERE no = ?;`;

      db.query(query, [num], (err, replyFlag) => {
        if (err) reject(err);
        else resolve(replyFlag[0].num);
      });
    });
  }

  static deleteCommentByNum(num) {
    return new Promise((resolve, rejcet) => {
      const query = `DELETE FROM comments WHERE no = ? AND reply_flag = 0`;

      db.query(query, [num], (err) => {
        if (err) rejcet(err);
        else resolve(true);
      });
    });
  }

  static updatehiddenFlag(num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET hidden_flag = 1 WHERE no = ?;`;

      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static findOneGroupNum(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT group_no AS groupNum FROM comments WHERE no = ?;`;

      db.query(query, [num], (err, comment) => {
        if (err) reject(err);
        else resolve(comment[0].groupNum);
      });
    });
  }

  static deleteReplyByNum(num) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM comments WHERE no = ? AND depth = 1`;

      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static updateReplyFlag(groupNum) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET reply_flag = 0 WHERE no = ? AND
            (SELECT count(group_no) FROM (SELECT group_no FROM comments AS group_no WHERE group_no = ?) AS count) = 1;`;

      db.query(query, [groupNum, groupNum], (err, rows) => {
        if (err) reject(err);
        else resolve(rows.affectedRows);
      });
    });
  }

  static findOneHiddenFlag(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT hidden_flag AS hiddenFlag FROM comments WHERE no = ?;`;

      db.query(query, [num], (err, comment) => {
        if (err) reject(err);
        else resolve(comment[0].hiddenFlag);
      });
    });
  }

  static deleteHiddenComment(num) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM comments WHERE no = ? AND hidden_flag = 1 AND reply_flag = 0;`;

      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = CommentStorage;
