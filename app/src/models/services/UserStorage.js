"use strict";

const db = require("../../config/db");

class UserStorage {
  static findOne(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE id=?;";

      db.query(query, [id], (err, users) => {
        if (err) reject(`${err}`);
        else resolve(users[0]);
      });
    });
  }

  static findAllAsIdOrEmail(id, email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE id=? OR email=?;";

      db.query(query, [id, email], (err, users) => {
        if (err) reject(String(err));
        else resolve(users);
      });
    });
  }

  static async save(client) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO students(id, major_no, name, email, psword, salt, token) VALUES(?, ?, ?, ?, ?, ?, ?);";

      db.query(
        query,
        [client.id, 16, client.name, client.email, client.psword, 0, 0],
        (err) => {
          if (err) reject(String(err));
          else resolve(true);
        }
      );
    });
  }
}

module.exports = UserStorage;
