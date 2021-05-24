import * as bcrypt from "bcrypt";

interface crypto {
  hash: string;
  salt: string;
}

class Cryptor {
  static saltRounds = 10;

  static encrypt(psword: string): Promise<crypto> {
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

  static encryptBySalt(psword: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(psword, salt, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  }
}

export default Cryptor;
