"use strict";

const db = require("../../config/db");

class UserStorage {
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  static async save(user) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO students(id, major_no, name, email, psword, salt, token) VALUES(?, ?, ?, ?, ?, ?, ?);";
      db.query(
        query,
        [user.id, 16, user.name, user.email, user.psword, 0, 0],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = UserStorage;
