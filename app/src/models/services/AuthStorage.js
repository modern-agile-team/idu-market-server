"use strict";

const db = require("../../config/db");

class AuthStorage {
  static findOneById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM auth WHERE student_id=?;";

      db.query(query, [id], (err, auth) => {
        if (err) reject(String(err));
        else resolve(auth[0]);
      });
    });
  }

  static updateToken(user) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE auth SET email_token=? WHERE student_id=?;";

      db.query(query, [user.token, user.id], (err) => {
        if (err) reject(String(err));
        else resolve(true);
      });
    });
  }

  static saveToken(user) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO auth(student_id, email_token) VALUES(?, ?);";

      db.query(query, [user.id, user.token], (err) => {
        if (err) reject(String(err));
        else resolve(true);
      });
    });
  }
}

module.exports = AuthStorage;
