import * as redis from "redis";

const db = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

db.on("error", function (error) {
  console.error(error);
});

interface Student {
  id: string;
  token: string;
}

class AuthStorage {
  static expireTime = 60 * 60 * 24;

  static findOneByStudentId(id: string) {
    return new Promise((resolve, reject) => {
      db.get(`${id}:token`, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });
  }

  static saveToken(student: Student) {
    return new Promise((resolve, reject) => {
      db.set(
        `${student.id}:token`,
        `${student.token}`,
        "EX",
        this.expireTime,
        (err) => {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  }

  static deleteTokenByStudentId(id: string) {
    return new Promise((resolve, reject) => {
      db.del(`${id}:token`, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

export default AuthStorage;
