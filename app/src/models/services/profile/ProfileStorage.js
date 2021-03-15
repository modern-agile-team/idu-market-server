const db = require("../../../config/db");

class ProfileStorage {
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT st.id, st.name, st.email, st.profile_path
      FROM students st
      where st.id= ?;`;

      db.query(sql, [id], (err, profile) => {
        if (err) reject(err);
        resolve(profile);
      });
    });
  }

  static findtitleById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT bo.title
      FROM boards bo
      WHERE bo.student_id = ?`;

      db.query(sql, [id], (err, title) => {
        if (err) reject(err);
        resolve(title);
      });
    });
  }

  static findOneById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT bo.title, comments.content
      FROM comments
      JOIN boards bo
      ON bo.no = comments.board_no
      WHERE comments.student_id = ?`;

      db.query(sql, [id], (err, comments) => {
        if (err) reject(err);
        resolve(comments);
      });
    });
  }

  static update(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.id = ?, st.name = ?, st.email = ?, st.profile_path = ?
      WHERE st.id = ?;`;

      db.query(
        sql,
        [body.changeId, body.name, body.email, body.url, body.studentId],
        (err) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }
}

module.exports = ProfileStorage;
