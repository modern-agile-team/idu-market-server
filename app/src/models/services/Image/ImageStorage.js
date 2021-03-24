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
}

module.exports = ImageStorage;
