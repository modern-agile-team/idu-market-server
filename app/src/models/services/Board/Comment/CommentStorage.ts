import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../../../config/db";

interface Comment {
  isCreate: boolean;
  num: number;
}

interface buyer {
  nickname: string;
}

interface comments {
  studentId: string;
  studentName: string;
  profilePath: string;
  nickname: string;
  commentNum: number;
  commentContent: string;
  commentGroupNum: number;
  commentDepth: number;
  commentReplyFlag: number;
  commentHiddenFlag: number;
  commentInDate: string;
}

class CommentStorage {
  static createByBoardNum(comment: any, boardNum: number): Promise<Comment> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth)
       VALUES (?, ?, ?, 0, 0);`;

      db.query(
        query,
        [comment.studentId, boardNum, comment.content, comment.depth],
        (err, createdInfo: ResultSetHeader) => {
          if (err) reject(err);
          resolve({ isCreate: true, num: createdInfo.insertId });
        }
      );
    });
  }

  static createReplyByGroupNum(
    reply: any,
    boardNum: number,
    groupNum: number
  ): Promise<Comment> {
    return new Promise((resolve, rejcet) => {
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth, reply_flag) 
      VALUES (?, ?, ?, ?, 1, 0);`;

      db.query(
        query,
        [reply.studentId, boardNum, reply.content, groupNum],
        (err, replyInfo: ResultSetHeader) => {
          if (err) rejcet(err);
          resolve({ isCreate: true, num: replyInfo.insertId });
        }
      );
    });
  }

  static findAllByBoardNum(boardNum: number): Promise<comments[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.admin_flag as isAuth, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum, 
      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag, 
      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM comments cmt
      JOIN students AS st
      ON cmt.student_id = st.id
      LEFT JOIN boards AS bo
      ON cmt.board_no = bo.no
      WHERE cmt.board_no = ?
      ORDER BY groupNum, inDate;`;

      db.query(query, [boardNum], (err, comments: RowDataPacket[]) => {
        const comment: comments[] = Object.values(
          JSON.parse(JSON.stringify(comments))
        );
        if (err) reject(err);
        resolve(comment);
      });
    });
  }

  static findOneByNum(num: number): Promise<RowDataPacket[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.admin_flag as isAuth, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum,
      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag,
      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM comments AS cmt
      JOIN students AS st
      ON cmt.student_id = st.id
      WHERE cmt.no = ?;`;

      db.query(query, [num], (err, comments: RowDataPacket[]) => {
        if (err) reject(err);
        resolve(comments);
      });
    });
  }

  static findReplyFlag(num: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT reply_flag AS replyFlag FROM comments WHERE no = ?;";

      db.query(query, [num], (err, replyFlag: RowDataPacket[]) => {
        if (err) reject(err);
        else resolve(replyFlag[0].replyFlag);
      });
    });
  }

  static findOneGroupNum(num: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = "SELECT group_no AS groupNum FROM comments WHERE no = ?;";

      db.query(query, [num], (err, comment: RowDataPacket[]) => {
        if (err) reject(err);
        else resolve(comment[0].groupNum);
      });
    });
  }

  static findOneHiddenFlag(num: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT hidden_flag AS hiddenFlag FROM comments WHERE no = ?;";

      db.query(query, [num], (err, comment: RowDataPacket[]) => {
        if (err) reject(err);
        else resolve(comment[0].hiddenFlag);
      });
    });
  }

  static updateReplyFlagOfCommentByGroupNum(
    commentNum: number
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET reply_flag = 1
      WHERE no = ?;`;

      db.query(query, [commentNum], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  static updateGroupNum(commentNum: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = "UPDATE comments SET group_no = ? WHERE no = ?";

      db.query(query, [commentNum, commentNum], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static updateByNum(comment: any, num: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE comments SET content = ? WHERE no = ? AND student_id = ?;";

      db.query(
        query,
        [comment.content, num, comment.studentId],
        (err, updatedInfo: ResultSetHeader) => {
          if (err) reject(err);
          else resolve(updatedInfo.affectedRows);
        }
      );
    });
  }

  static updatehiddenFlag(num: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = "UPDATE comments SET hidden_flag = 1 WHERE no = ?;";

      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static updateReplyFlag(groupNum: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `UPDATE comments SET reply_flag = 0 WHERE no = ? AND
            (SELECT count(group_no) FROM (SELECT group_no FROM comments AS group_no WHERE group_no = ?) AS count) = 1;`;

      db.query(query, [groupNum, groupNum], (err, rows: ResultSetHeader) => {
        if (err) reject(err);
        else resolve(rows.affectedRows);
      });
    });
  }

  static deleteCommentByNum(num: number, studentId: string): Promise<number> {
    return new Promise((resolve, rejcet) => {
      const query =
        "DELETE FROM comments WHERE no = ? AND reply_flag = 0 AND depth = 0 AND student_id = ?";

      db.query(query, [num, studentId], (err, row: ResultSetHeader) => {
        if (err) rejcet(err);
        else resolve(row.affectedRows);
      });
    });
  }

  static deleteReplyByNum(num: number, studentId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const query =
        "DELETE FROM comments WHERE no = ? AND depth = 1 AND student_id = ?";

      db.query(query, [num, studentId], (err, row: ResultSetHeader) => {
        if (err) reject(err);
        else resolve(row.affectedRows);
      });
    });
  }

  static deleteHiddenComment(num: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query =
        "DELETE FROM comments WHERE no = ? AND hidden_flag = 1 AND reply_flag = 0;";

      db.query(query, [num], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static findStudentIdByNum(boardNum: number): Promise<buyer[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT DISTINCT nickname 
      FROM comments cm
      JOIN students st
      ON st.id = cm.student_id
      WHERE board_no = ? AND cm.hidden_flag = 0;`;

      db.query(sql, [boardNum], (err, students: RowDataPacket[]) => {
        const buyers: buyer[] = Object.values(
          JSON.parse(JSON.stringify(students))
        );

        if (err) reject(err);
        else resolve(buyers);
      });
    });
  }
}

export default CommentStorage;
