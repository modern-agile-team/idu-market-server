const db = require("../../../config/db");

class ProfileStorage {
  static findOneById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT st.id, st.name, st.nickname, st.email, 
      st.profile_path AS profilePath, majors.name AS major
      FROM students st
      JOIN majors
      ON st.major_no = majors.no
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

  static findOneByStudentId(id) {
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

  static updateAll(body, studentId) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.email = ?, st.nickname = ?, st.major_no = ?
      WHERE st.id = ?;`;

      db.query(
        sql,
        [body.email, body.nickname, body.majorNum, studentId],
        (err) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  static updateEmailAndMajor(body, studentId) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.email = ?, st.major_no = ?
      WHERE st.id = ?`;

      db.query(sql, [body.email, body.majorNum, studentId], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  static updateNicknameAndMajor(body, studentId) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.nickname = ?, st.major_no = ?
      WHERE st.id = ?`;

      db.query(sql, [body.nickname, body.majorNum, studentId], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  static updateOnlyMajor(body, studentId) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.major_no = ?
      WHERE st.id = ?`;

      db.query(sql, [body.majorNum, studentId], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  static findAllByEmailAndNickname(email, nickname) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE email=? OR nickname=?;";

      db.query(query, [email, nickname], (err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  }
}

module.exports = ProfileStorage;
