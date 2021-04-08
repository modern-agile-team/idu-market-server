import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../../config/db";

interface profile {
  id: string;
  name: string;
  nickname: string;
  email: string;
  profilePath: string;
  major: string;
  majorNum: number;
}

type body = profile;

type findEmailAndNickname = profile;

class ProfileStorage {
  static findOneById(id: string): Promise<profile> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT st.id, st.name, st.nickname, st.email, 
      st.profile_path AS profilePath, majors.name AS major
      FROM students st
      JOIN majors
      ON st.major_no = majors.no
      where st.id= ?;`;

      db.query(sql, [id], (err, profile: RowDataPacket[]) => {
        if (err) reject(err);
        const user: profile[] = Object.values(
          JSON.parse(JSON.stringify(profile))
        );
        resolve(user[0]);
      });
    });
  }

  static updateImage(
    image: string,
    studentId: string
  ): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE students st SET st.profile_path = ? WHERE st.id = ?";

      db.query(sql, [image, studentId], (err, data: ResultSetHeader) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static updateAll(body: body, studentId: string): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.email = ?, st.nickname = ?, st.major_no = ?
      WHERE st.id = ?;`;

      db.query(
        sql,
        [body.email, body.nickname, body.majorNum, studentId],
        (err, data: ResultSetHeader) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }

  static updateEmailAndMajor(
    body: body,
    studentId: string
  ): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.email = ?, st.major_no = ?
      WHERE st.id = ?`;

      db.query(
        sql,
        [body.email, body.majorNum, studentId],
        (err, data: ResultSetHeader) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }

  static updateNicknameAndMajor(
    body: body,
    studentId: string
  ): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE students st
      SET st.nickname = ?, st.major_no = ?
      WHERE st.id = ?`;

      db.query(
        sql,
        [body.nickname, body.majorNum, studentId],
        (err, data: ResultSetHeader) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }

  static findAllByEmailAndNickname(
    email: string,
    nickname: string
  ): Promise<findEmailAndNickname[]> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE email=? OR nickname=?;";

      db.query(query, [email, nickname], (err, user: RowDataPacket[]) => {
        const users: findEmailAndNickname[] = Object.values(
          JSON.parse(JSON.stringify(user))
        );
        if (err) reject(err);
        else resolve(users);
      });
    });
  }
}

export default ProfileStorage;
