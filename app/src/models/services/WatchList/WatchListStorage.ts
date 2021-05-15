import mariadb from "../../../config/mariadb";

interface watchlist {
  num: number;
  studentId: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  sellerId: string;
  sellerName: string;
  categoryName: string;
  profilePath: string;
  commentCount: number;
  inDate: Date;
}

interface request {
  boardNum?: number;
  categoryName?: string;
}

class WatchListStorage {
  // 관심목록에 담는 코드
  static async create(
    boardNum: number,
    categoryNum: number,
    studentId: string
  ): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO watch_lists(board_no, category_no, student_id) VALUES(?, ?, ?)`;

      const result = await conn.query(query, [
        boardNum,
        categoryNum,
        studentId,
      ]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  // 학생의 모든 관심목록 조회
  static async findAllByStudentId(studentId: string): Promise<watchlist[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT bo.no AS boardNum, wl.student_id AS studentId, bo.thumbnail, bo.title, bo.hit, bo.price,
        bo.student_id AS sellerId, st.nickname AS sellerName, ctg.name AS categoryName, st.profile_path AS profilePath,
        COUNT(cmt.content) AS commentCount, date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate
        FROM watch_lists AS wl
        JOIN boards AS bo
        ON bo.no = wl.board_no 
        LEFT JOIN comments AS cmt
        ON wl.board_no = cmt.board_no
        JOIN students AS st
        ON st.id = bo.student_id
        JOIN categories AS ctg
        ON ctg.no = wl.category_no
        WHERE wl.student_id = ?
        GROUP BY wl.no
        ORDER BY wl.no DESC`;

      const watchlist = await conn.query(query, [studentId]);

      const watchlists: watchlist[] = Object.values(
        JSON.parse(JSON.stringify(watchlist))
      );
      return watchlists;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  //장바구니 하나 조회 코드
  static async findOneByBoardNumAndStudentId(
    boardNum: number,
    studentId: string
  ): Promise<watchlist> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT board_no, student_id FROM watch_lists WHERE board_no=? AND student_id=?`;

      const watchlist = await conn.query(query, [boardNum, studentId]);

      const watchlists: watchlist[] = Object.values(
        JSON.parse(JSON.stringify(watchlist))
      );
      return watchlists[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  //장바구니 있는 물건 삭제
  static async delete(studentId: string, product: request): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `DELETE FROM watch_lists WHERE board_no = ? AND student_id = ?`;

      const result = await conn.query(query, [product, studentId]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

export default WatchListStorage;
