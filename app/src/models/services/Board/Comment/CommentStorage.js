const db = require("../../../../config/db");

class CommentStorage {
  static createByBoardNum(comment, boardNum) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth)
       VALUES (?, ?, ?, 0, 0);`;

      db.query(
        query,
        [comment.studentId, boardNum, comment.content, comment.depth],
        (err, createdInfo) => {
          if (err) reject(err);
          resolve({ isCreate: true, num: createdInfo.insertId });
        }
      );
    });
  }

  static createReplyByGroupNum(reply, boardNum, groupNum) {
    return new Promise((resolve, rejcet) => {
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth, reply_flag) 
      VALUES (?, ?, ?, ?, 1, 0);`;

      db.query(
        query,
        [reply.studentId, boardNum, reply.content, groupNum],
        (err, replyInfo) => {
          if (err) rejcet(err);
          resolve({ isCreate: true, num: replyInfo.insertId });
        }
      );
    });
  }

  static findAllByBoardNum(boardNum) {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum, 
      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag, 
      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM comments cmt
      JOIN students AS st
      ON cmt.student_id = st.id
      LEFT JOIN boards AS bo
      ON cmt.board_no = bo.no
      WHERE cmt.board_no = ?
      ORDER BY groupNum, inDate;`;

      db.query(query, [boardNum], (err, comment) => {
        if (err) reject(err);
        resolve(comment);
      });
    });
  }

  static findOneByNum(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum,
      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag,
      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM comments AS cmt
      JOIN students AS st
      ON cmt.student_id = st.id
      WHERE cmt.no = ?;`;

      db.query(query, [num], (err, comments) => {
        if (err) reject(err);
        resolve(comments[0]);
      });
    });
  }

  static findReplyFlag(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT reply_flag AS replyFlag FROM comments WHERE no = ?;`;

      db.query(query, [num], (err, replyFlag) => {
        if (err) reject(err);
        else resolve(replyFlag[0].replyFlag);
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

  static findOneHiddenFlag(num) {
    return new Promise((resolve, reject) => {
      const query = `SELECT hidden_flag AS hiddenFlag FROM comments WHERE no = ?;`;

      db.query(query, [num], (err, comment) => {
        if (err) reject(err);
        else resolve(comment[0].hiddenFlag);
      });
    });
  }

  static updateReplyFlagOfCommentByGroupNum(commentNum) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET reply_flag = 1
      WHERE no = ?;`;

      db.query(query, [commentNum], (err) => {
        if (err) reject(err);
        resolve(true);
      });
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

  static updateByNum(comment, num) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET content = ? WHERE no = ? AND student_id = ?;`;

      db.query(
        query,
        [comment.content, num, comment.studentId],
        (err, updatedInfo) => {
          if (err) reject(err);
          else resolve(updatedInfo.affectedRows);
        }
      );
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

  static deleteCommentByNum(num) {
    return new Promise((resolve, rejcet) => {
      const query = `DELETE FROM comments WHERE no = ? AND reply_flag = 0 AND depth = 0`;

      db.query(query, [num], (err, row) => {
        if (err) rejcet(err);
        else resolve(row.affectedRows);
      });
    });
  }

  static deleteReplyByNum(num, studentId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM comments WHERE no = ? AND depth = 1 AND student_id = ?`;

      db.query(query, [num, studentId], (err, row) => {
        if (err) reject(err);
        else resolve(row.affectedRows);
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

  static findStudentIdByNum(board) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT DISTINCT nickname 
      FROM comments cm
      JOIN students st
      ON st.id = cm.student_id
      WHERE board_no = ? AND cm.hidden_flag = 0;`;

      db.query(sql, board, (err, buyers) => {
        if (err) reject(err);
        else resolve(buyers);
      });
    });
  }
}

module.exports = CommentStorage;
