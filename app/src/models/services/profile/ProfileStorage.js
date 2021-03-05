const db = require("../../../config/db");

class ProfileStorage {
  static findAllById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT st.id, st.name, st.email, img.path 
      FROM students st
      JOIN images img
      ON st.image_no=img.no
      where st.id= ?;`;

      db.query(sql, [id], (err, rows) => {
        if (err) reject(err);
        resolve({ success: true, rows });
      });
    });
  }
}

module.exports = ProfileStorage;
