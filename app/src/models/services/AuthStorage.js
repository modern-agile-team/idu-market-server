"use strict";

const db = require("../../config/db");

class AuthStorage {
  static findOneById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT student_id, token DATE_FORMAT(token_created_date, '%Y%m%d%H%i%s') AS token_created_date FROM auth WHERE student_id=?;";

      db.query(query, [id], (err, auth) => {
        if (err) reject(err);
        else resolve(auth[0]);
      });
    });
  }

  static updateToken(user) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE auth SET token=? WHERE student_id=?;";

      db.query(query, [user.token, user.id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static saveToken(user) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO auth(student_id, token) VALUES(?, ?);";

      db.query(query, [user.id, user.token], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM auth WHERE student_id=?;";

      db.query(query, [id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = AuthStorage;
