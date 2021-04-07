import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../../config/db";

interface Student {
  id?: string;
  major_no?: number;
  name?: string;
  nickname?: string;
  email?: string;
  psword?: string;
  salt?: string;
  profile_path?: string;
  admin_flag?: string;
  in_date?: string;
  err?: string;
}

class StudentStorage {
  static findOneById(id: string): Promise<Student> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE id=?;";

      db.query(query, [id], (err, results: RowDataPacket[]) => {
        if (err) reject(err);
        else {
          const students: Student[] = Object.values(
            JSON.parse(JSON.stringify(results))
          );

          resolve(students[0]);
        }
      });
    });
  }

  static findOneByEmail(email: string): Promise<Student> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE email=?;";

      db.query(query, [email], (err, results: RowDataPacket[]) => {
        if (err) reject(err);
        else {
          const students: Student[] = Object.values(
            JSON.parse(JSON.stringify(results))
          );

          resolve(students[0]);
        }
      });
    });
  }

  static findOneByIdAndEmail(id: string, email: string): Promise<Student> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE id=? OR email=?;";

      db.query(query, [id, email], (err, results: RowDataPacket[]) => {
        if (err) reject(err);
        else {
          const students: Student[] = Object.values(
            JSON.parse(JSON.stringify(results))
          );

          resolve(students[0]);
        }
      });
    });
  }

  static findAllByName(name: string): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students WHERE name=?;";

      db.query(query, [name], (err, results: RowDataPacket[]) => {
        if (err) reject(err);
        else {
          const students: Student[] = Object.values(
            JSON.parse(JSON.stringify(results))
          );

          resolve(students);
        }
      });
    });
  }

  static findAllByIdAndEmailAndNickname(
    id: string,
    email: string,
    nickname: string
  ): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM students WHERE id=? OR email=? OR nickname=?;";

      db.query(
        query,
        [id, email, nickname],
        (err, results: RowDataPacket[]) => {
          if (err) reject(err);
          else {
            const students: Student[] = Object.values(
              JSON.parse(JSON.stringify(results))
            );

            resolve(students);
          }
        }
      );
    });
  }

  static save(client: any): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO students(id, major_no, name, nickname, email, psword, salt) VALUES(?, ?, ?, ?, ?, ?, ?);";

      db.query(
        query,
        [
          client.id,
          client.major,
          client.name,
          client.nickname,
          client.email,
          client.psword,
          client.salt,
        ],
        (err, result: ResultSetHeader) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  static resetPassword(client: any): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
      const query = "UPDATE students SET psword=? WHERE id=?;";

      db.query(
        query,
        [client.newPsword, client.id],
        (err, result: ResultSetHeader) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
}

export default StudentStorage;
