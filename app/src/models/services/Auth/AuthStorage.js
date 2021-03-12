const db = require("redis");
const redis = db.createClient();

redis.on("error", function (error) {
  console.error(error);
});

class AuthStorage {
  static expireTime = 60 * 60 * 24;

  static findOneByStudentId(id) {
    return new Promise((resolve, reject) => {
      redis.get(`${id}:token`, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });
  }

  static saveToken(user) {
    return new Promise((resolve, reject) => {
      redis.set(
        `${user.id}:token`,
        `${user.token}`,
        "EX",
        this.expireTime,
        (err) => {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  }

  static deleteTokenByStudentId(id) {
    return new Promise((resolve, reject) => {
      redis.del(`${id}:token`, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

module.exports = AuthStorage;
