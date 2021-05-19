import mariadb from "../../../config/mariadb";

interface body {
  studentId: string;
  title: string;
  content: string;
}

class InquiryStorage {
  static async create(body: body): Promise<boolean> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO inquiries(student_id, title, content) VALUES (?, ?, ?)`;

      const inquiry = await conn.query(query, [
        body.studentId,
        body.title,
        body.content,
      ]);

      if (inquiry.affectedRows === 1) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

export default InquiryStorage;
