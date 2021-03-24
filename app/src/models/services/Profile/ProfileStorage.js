const db = require("../../../config/db");

class ProfileStorage {
  static findOneById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT st.id, st.name, st.email, st.profile_path AS profilePath
      FROM students st
      where st.id= ?;`;

      db.query(sql, [id], (err, profile) => {
        if (err) reject(err);
        resolve(profile[0]);
      });
    });
  }

  static updateImage(image, studentId) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st SET st.profile_path = ? WHERE st.id = ?`;

      db.query(sql, [image, studentId], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  // static findtitleById(id) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `SELECT bo.title
  //     FROM boards bo
  //     WHERE bo.student_id = ?`;

  //     db.query(sql, [id], (err, title) => {
  //       if (err) reject(err);
  //       resolve(title);
  //     });
  //   });
  // }

  // static findOneByStudentId(id) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `SELECT bo.title, comments.content
  //     FROM comments
  //     JOIN boards bo
  //     ON bo.no = comments.board_no
  //     WHERE comments.student_id = ?`;

  //     db.query(sql, [id], (err, comments) => {
  //       if (err) reject(err);
  //       resolve(comments);
  //     });
  //   });
  // }

  static update(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.email = ?
      WHERE st.id = ?;`;

      db.query(sql, [body.email], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = ProfileStorage;
