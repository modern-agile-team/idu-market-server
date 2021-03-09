const db = require("../../../config/db");

class ImageStorage {
  static findOneByNum(boardNum) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT path FROM images WHERE board_no = ?`;
      db.query(sql, boardNum, (err, path) => {
        if (err) reject(err);
        resolve(path);
      });
    });
  }

  // static create(client) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `INSERT INTO images(board_no, student_id, path, size, type)
  //     VALUES(?,?,?,?,?)`;
  //     const params = [client.body.boardNum, client.body.studentId, client.files.location, client.files.size, client.files.type];
  //     db.query(sql, params, (err, rows) => {
  //       if (err) reject(err);
  //     });
  //   });
  // }
}

module.exports = ImageStorage;
