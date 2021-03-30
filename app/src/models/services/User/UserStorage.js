const db = require("../../..//config/db");

class UserStorage {
  static findOneById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE id=?;";

      db.query(query, [id], (err, users) => {
        if (err) reject(err);
        else resolve(users[0]);
      });
    });
  }

  static findAllByName(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE name=?;";

      db.query(query, [name], (err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  }

  static findOneByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE email=?;";

      db.query(query, [email], (err, users) => {
        if (err) reject(err);
        else resolve(users[0]);
      });
    });
  }

  static findOneByIdAndEmail(id, email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE id=? OR email=?;";

      db.query(query, [id, email], (err, users) => {
        if (err) reject(err);
        else resolve(users[0]);
      });
    });
  }

  static findAllByIdAndEmailAndNickname(id, email, nickname) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM students WHERE id=? OR email=? OR nickname=?;";

      db.query(query, [id, email, nickname], (err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  }

  static async save(client) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO students(id, major_no, name, nickname, email, psword, salt) VALUES(?, ?, ?, ?, ?, ?, ?);";

      db.query(
        query,
        [
          client.id,
          16,
          client.name,
          client.email,
          client.nickname,
          client.psword,
          client.salt,
        ],
        (err) => {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  }

  static async resetPassword(client) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE students SET psword=? WHERE id=?;";

      db.query(query, [client.newPsword, client.id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = UserStorage;
