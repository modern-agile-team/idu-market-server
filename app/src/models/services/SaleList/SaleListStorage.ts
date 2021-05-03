import { RowDataPacket } from "mysql2";
import db from "../../../config/db";

interface saleList {
  num: number;
  sellerId: string;
  sellerName: string;
  profilePath: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  categoryName: string;
  commentCount: number;
  inDate: Date;
}

class SaleListStorage {
  static findAllByStatus(id: string): Promise<saleList[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT bo.no AS num, bo.student_id AS sellerId, st.nickname AS sellerName, st.profile_path AS profilePath, 
      bo.thumbnail, bo.title, bo.hit, 
      bo.price, cat.name AS categoryName, COUNT(cmt.content) AS commentCount
      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate
      FROM boards bo
      JOIN categories cat
      ON cat.no = bo.category_no
      JOIN students st
      ON st.id = bo.student_id
      LEFT JOIN comments cmt
      ON cmt.board_no = bo.no
      WHERE (cat.no = 1 OR cat.no = 2 OR cat.no = 3) AND bo.student_id = ?
      GROUP BY bo.no
      ORDER BY bo.no desc`;

      db.query(sql, [id], function (err, saleList: RowDataPacket[]) {
        const saleLists: saleList[] = Object.values(
          JSON.parse(JSON.stringify(saleList))
        );
        if (err) reject(err);
        else resolve(saleLists);
      });
    });
  }
}

export default SaleListStorage;
