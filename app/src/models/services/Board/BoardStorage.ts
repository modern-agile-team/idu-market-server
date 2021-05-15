import mariadb from "../../../config/mariadb";

interface Board {
  success?: boolean;
  num?: number;
  boardNum?: number;
}

interface boards {
  num: number;
  studentId: string;
  profilePath: string;
  nickname: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  commentCount: number;
  status: number;
  inDate: string;
}

interface board {
  num: number;
  studentId: string;
  profilePath: string;
  nickname: string;
  studentName: string;
  title: string;
  content: string;
  hit: number;
  price: string;
  status: number;
  inDate: number;
  updateDate: string;
  categoryNum?: number;
  images?: string;
}

interface Image {
  upload?: boolean;
  boardNum?: number;
  board?: string;
}

class BoardStroage {
  static async create(num: number, board: any): Promise<Board> {
    let conn;
    try {
      conn = await mariadb.getConnection();

      const boards = await conn.query(
        "INSERT INTO boards (student_id, category_no, title, content, thumbnail, price) VALUES (?, ?, ?, ?, ?, ?);",
        [
          board.studentId,
          num,
          board.title,
          board.content,
          board.thumbnail,
          board.price,
        ]
      );

      return { success: true, num: boards.insertId };
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createImages(num: number, board: any): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();

      for (let image of board.images) {
        await conn.query("INSERT INTO images (board_no, url) VALUES (?,?);", [
          num,
          image,
        ]);
      }

      return true;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findAllByImage(num: number): Promise<Image[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const images = [];
      const query = "SELECT url FROM images WHERE board_no = ?";
      const boards = await conn.query(query, [num]);

      const board: Image[] = Object.values(JSON.parse(JSON.stringify(boards)));
      for (const obj of board) {
        images.push(obj["url"]);
      }

      return images;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findAllByCategoryNum(
    categoryNum: number,
    lastNum: number
  ): Promise<boards[]> {
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

    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT bo.no AS num, st.id AS studentId, st.nickname AS nickname, st.admin_flag as isAuth, st.profile_path AS profilePath, bo.thumbnail, bo.title, bo.hit, bo.price, bo.status,
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

      const boards = await conn.query(query, [categoryNum, lastNum]);

      const board: boards[] = Object.values(JSON.parse(JSON.stringify(boards)));
      return board;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByNum(num: number): Promise<board> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT bo.no AS num, bo.student_id AS studentId, st.name AS studentName, st.nickname, st.admin_flag as isAuth, st.profile_path AS profilePath, bo.title AS title, bo.content, bo.hit AS hit, bo.price AS price, bo.status AS status,
      bo.category_no AS categoryNum, date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM boards AS bo
      JOIN students AS st
      ON bo.student_id = st.id
      WHERE bo.no = ?`;

      const boards = await conn.query(query, [num]);
      const board: board[] = Object.values(JSON.parse(JSON.stringify(boards)));
      return board[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async isWatchList(studentId: string, num: number): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT wl.no FROM boards AS bo
      JOIN watch_lists AS wl
      ON bo.no = wl.board_no
      WHERE wl.student_id = ? and bo.no = ?;`;

      const watchList = await conn.query(query, [studentId, num]);
      return watchList.length;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateByNum(board: any, num: number): Promise<Board> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "UPDATE boards SET title = ?, content = ?, price = ? where no = ?;";

      const boards = await conn.query(query, [
        board.title,
        board.content,
        board.price,
        num,
      ]);
      return { success: true, num: boards.insertId };
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateOnlyHitByNum(num: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "UPDATE boards SET hit = hit + 1 WHERE no = ?;";

      const boards = await conn.query(query, [num]);
      return true;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async getHit(num: number): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "SELECT hit FROM boards WHERE no = ?;";

      const boards = await conn.query(query, [num]);
      return boards[0].hit;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateOnlyStatusByNum(
    board: any,
    num: number
  ): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "UPDATE boards SET status = ? WHERE no = ?;";

      await conn.query(query, [board.status, num]);
      return true;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async delete(num: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "DELETE FROM boards where no = ?";

      await conn.query(query, [num]);
      return true;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async deleteImage(num: number): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "DELETE FROM images where board_no = ?";

      await conn.query(query, [num]);
      return true;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findAllByIncludedTitleAndCategory(
    title: string,
    categoryNum: number
  ): Promise<boards> {
    let conn;
    try {
      conn = await mariadb.getConnection();
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

      const boards = await conn.query(query, [title, categoryNum]);
      return boards;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

export default BoardStroage;
