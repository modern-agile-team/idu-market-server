import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../../config/db";

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
  //장바구니 화면
  static findAllByStudentId(studentId: string): Promise<watchlist[]> {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT bo.no AS num, wl.student_id AS studentId, bo.thumbnail, bo.title, bo.hit, bo.price,
      bo.student_id AS sellerId, st.nickname AS sellerName, wl.category_name AS categoryName, st.profile_path AS profilePath,
      COUNT(cmt.content) AS commentCount, date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate
      FROM watch_lists wl
      JOIN boards bo
      ON bo.no = wl.board_no 
      LEFT JOIN comments cmt
      ON wl.board_no = cmt.board_no
      JOIN students st
      ON st.id = bo.student_id
      WHERE wl.student_id = ?
      GROUP BY wl.no
      ORDER BY wl.no DESC`;
      db.query(sql, [studentId], (err, board: RowDataPacket[]) => {
        const boards: watchlist[] = Object.values(
          JSON.parse(JSON.stringify(board))
        );
        if (err) reject(err);
        resolve(boards);
      });
    });
  }
  //장바구니 담는 코드
  static isExist(studentId: string, watchlist: request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const isexist = `SELECT board_no, student_id FROM watch_lists WHERE board_no=? AND student_id=?`;
      const testParams = [watchlist.boardNum, studentId];
      db.query(isexist, testParams, (err, boards: RowDataPacket[]) => {
        if (err) reject(err);
        if (!boards.length) {
          resolve(true);
        } else resolve(false);
      });
    });
  }
  //장바구니에 담는 코드
  static update(studentId: string, board: request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO watch_lists(board_no, category_name, student_id) VALUES(?, ?, ?)`;
      const params = [board.boardNum, board.categoryName, studentId];
      db.query(sql, params, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  //장바구니 있는 물건 삭제
  static delete(studentId: string, product: request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM watch_lists WHERE board_no = ? AND student_id = ?`;
      const params = [product, studentId];
      db.query(sql, params, (err, result: ResultSetHeader) => {
        if (err) reject(err);
        if (result.affectedRows) resolve(true);
        resolve(false);
      });
    });
  }
}

export default WatchListStorage;
