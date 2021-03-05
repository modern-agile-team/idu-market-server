"use strict";

const bcrypt = require("bcrypt");

class Cryptor {
  static saltRounds = 10;

  static encrypt(psword) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err, salt) => {
        if (err) reject(err);
        else {
          bcrypt.hash(psword, salt, (err, hash) => {
            if (err) reject(err);
            else resolve({ hash, salt });
          });
        }
      });
    });
  }

  static encryptBySalt(psword, salt) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(psword, salt, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  }
}

module.exports = Cryptor;
