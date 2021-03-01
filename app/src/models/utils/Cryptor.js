"use strict";

const bcrypt = require("bcrypt");

class Cryptor {
  saltRounds = 10;

  static encrypt(psword) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err, salt) => {
        if (err) reject(String(err));
        else {
          bcrypt.hash(psword, salt, (err, hash) => {
            if (err) reject(String(err));
            else resolve({ hash, salt });
          });
        }
      });
    });
  }

  static encryptBySalt(psword, salt) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(psword, salt, (err, hash) => {
        if (err) reject(String(err));
        else resolve(hash);
      });
    });
  }
}

module.exports = Cryptor;
