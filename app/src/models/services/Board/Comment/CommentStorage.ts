import mariadb from "../../../../config/mariadb";

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
  num: number;
  content: string;
  groupNum: number;
  depth: number;
  replyFlag: number;
  hiddenFlag: number;
  inDate: string;
  updateDate: string;
}

class CommentStorage {
  static async createByBoardNum(
    comment: any,
    boardNum: number
  ): Promise<Comment> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth)
       VALUES (?, ?, ?, 0, 0);`;

      const createdInfo = await conn.query(query, [
        comment.studentId,
        boardNum,
        comment.content,
        comment.depth,
      ]);

      return { isCreate: true, num: createdInfo.insertId };
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createReplyByGroupNum(
    reply: any,
    boardNum: number,
    groupNum: number
  ): Promise<Comment> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO comments (student_id, board_no, content, group_no, depth, reply_flag) 
      VALUES (?, ?, ?, ?, 1, 0);`;

      const replyInfo = await conn.query(query, [
        reply.studentId,
        boardNum,
        reply.content,
        groupNum,
      ]);

      return { isCreate: true, num: replyInfo.insertId };
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findAllByBoardNum(boardNum: number): Promise<comments[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.admin_flag as isAdmin, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum, 
      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag, 
      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM comments AS cmt
      JOIN students AS st
      ON cmt.student_id = st.id
      LEFT JOIN boards AS bo
      ON cmt.board_no = bo.no
      WHERE cmt.board_no = ?
      ORDER BY groupNum, inDate;`;

      const comments = await conn.query(query, [boardNum]);
      const comment: comments[] = Object.values(
        JSON.parse(JSON.stringify(comments))
      );
      return comment;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByNum(num: number): Promise<comments[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.admin_flag as isAdmin, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum,
      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag,
      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM comments AS cmt
      JOIN students AS st
      ON cmt.student_id = st.id
      WHERE cmt.no = ?;`;

      const comments = await conn.query(query, [num]);
      const comment: comments[] = Object.values(
        JSON.parse(JSON.stringify(comments))
      );

      return comment;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findReplyFlag(num: number): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "SELECT reply_flag AS replyFlag FROM comments WHERE no = ?;";

      const replyFlag = await conn.query(query, [num]);

      return replyFlag[0].replyFlag;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneGroupNum(num: number): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "SELECT group_no AS groupNum FROM comments WHERE no = ?;";

      const comment = await conn.query(query, [num]);
      return comment[0].groupNum;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneHiddenFlag(num: number): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "SELECT hidden_flag AS hiddenFlag FROM comments WHERE no = ?;";

      const comment = await conn.query(query, [num]);
      return comment[0].hiddenFlag;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateReplyFlagOfCommentByGroupNum(
    commentNum: number
  ): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `UPDATE comments SET reply_flag = 1
      WHERE no = ?;`;

      const isUpdateReplyFlag = await conn.query(query, [commentNum]);

      if (isUpdateReplyFlag.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateGroupNum(commentNum: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "UPDATE comments SET group_no = ? WHERE no = ?";

      const isUpdateGroupNum = await conn.query(query, [
        commentNum,
        commentNum,
      ]);
      if (isUpdateGroupNum.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateByNum(comment: any, num: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "UPDATE comments SET content = ? WHERE no = ? AND student_id = ?;";

      const updatedInfo = await conn.query(query, [
        comment.content,
        num,
        comment.studentId,
      ]);

      if (updatedInfo.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updatehiddenFlag(num: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "UPDATE comments SET hidden_flag = 1 WHERE no = ?;";

      const isUpdateHiddenFlag = await conn.query(query, [num]);
      if (isUpdateHiddenFlag.affectRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateReplyFlag(groupNum: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `UPDATE comments SET reply_flag = 0 WHERE no = ? AND
            (SELECT count(group_no) FROM (SELECT group_no FROM comments AS group_no WHERE group_no = ?) AS count) = 1;`;

      const rows = await conn.query(query, [groupNum, groupNum]);
      if (rows.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async deleteCommentByNum(
    num: number,
    studentId: string
  ): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "DELETE FROM comments WHERE no = ? AND reply_flag = 0 AND depth = 0 AND student_id = ?";

      const rows = await conn.query(query, [num, studentId]);
      if (rows.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async deleteReplyByNum(
    num: number,
    studentId: string
  ): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "DELETE FROM comments WHERE no = ? AND depth = 1 AND student_id = ?";

      const rows = await conn.query(query, [num, studentId]);
      if (rows.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async deleteHiddenComment(num: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "DELETE FROM comments WHERE no = ? AND hidden_flag = 1 AND reply_flag = 0;";

      const isdeleteHiddenComment = await conn.query(query, [num]);
      if (isdeleteHiddenComment) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByBoardNum(boardNum: number): Promise<buyer[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT DISTINCT st.nickname, st.id 
      FROM comments AS cm
      JOIN students AS st
      ON st.id = cm.student_id
      WHERE board_no = ? AND cm.hidden_flag = 0;`;

      const students = await conn.query(query, [boardNum]);
      const buyers: buyer[] = Object.values(
        JSON.parse(JSON.stringify(students))
      );
      return buyers;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

export default CommentStorage;
