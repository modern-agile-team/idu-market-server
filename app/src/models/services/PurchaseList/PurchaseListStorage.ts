import mariadb from "../../../config/mariadb";

interface purchaseList {
  num: number;
  buyerId: string;
  buyerName: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  categoryName: string;
  commentCount: number;
  inDate: Date;
  sellerId: string;
  sellerName: string;
  profilePath: string;
}

class PurchaseListStorage {
  static async findAllById(id: string): Promise<purchaseList[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT bo.no AS boardNum, pu.student_id AS buyerId, st.nickname AS buyerName, bo.thumbnail, bo.title, bo.hit, 
      bo.price, cat.name AS categoryName, COUNT(cmt.content) AS commentCount
      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, bo.student_id AS sellerId,
      (SELECT nickname FROM students st where bo.student_id = st.id) AS sellerName,
      (SELECT profile_path FROM students st where bo.student_id = st.id) AS profilePath
          FROM purchase_lists pu 
          JOIN boards AS bo
          ON bo.no = pu.board_no 
          JOIN categories AS cat
          ON bo.category_no = cat.no
          JOIN students AS st
          ON st.id = pu.student_id
          LEFT JOIN comments AS cmt
          ON cmt.board_no = bo.no
          WHERE pu.student_id = ?
          GROUP BY pu.no
          ORDER BY pu.no DESC`;

      const purchaseList = await conn.query(query, [id]);

      const purchaseLists: purchaseList[] = Object.values(
        JSON.parse(JSON.stringify(purchaseList))
      );
      return purchaseLists;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByBoardNumberAndStudentId(
    boardNum: number,
    studentId: string
  ): Promise<purchaseList> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT * FROM purchase_lists
        WHERE board_no=? AND student_id=?`;

      const purchaseList = await conn.query(query, [boardNum, studentId]);

      const purchaseLists: purchaseList[] = Object.values(
        JSON.parse(JSON.stringify(purchaseList))
      );
      return purchaseLists[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async create(studentId: string, boardNum: number): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO purchase_lists(board_no, student_id) VALUES(?, ?)`;

      const result = await conn.query(query, [boardNum, studentId]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

export default PurchaseListStorage;
