const db = require("../../../config/db");

class ProfileStorage {
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT st.id, st.name, st.email, img.path 
      FROM students st
      JOIN images img
      ON st.image_no=img.no
      where st.id= ?;`;

      db.query(sql, [id], (err, profile) => {
        if (err) reject(err);
        resolve({ profile });
      });
    });
  }

  static update(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st INNER JOIN images img
      ON st.image_no = img.no
      SET st.id = ?, st.name = ?, st.email = ?, img.path = ?
      WHERE st.id = ?;`;

      db.query(
        sql,
        [body.changeId, body.name, body.email, body.path, body.studentId],
        (err) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }
}

module.exports = ProfileStorage;
