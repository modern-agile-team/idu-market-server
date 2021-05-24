import mariadb from "../../../config/mariadb";

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
  categoryName?: string;
}

class StudentStorage {
  static async findOneById(id: string): Promise<Student> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT st.id, st.name, st.email, st.nickname, st.psword, st.salt, st.profile_path, st.admin_flag, majors.name as categoryName 
         FROM students as st 
         JOIN majors 
         ON st.major_no = majors.no 
         WHERE st.id= ?`;

      const results = await conn.query(query, [id]);

      const students: Student[] = Object.values(
        JSON.parse(JSON.stringify(results))
      );
      return students[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByEmail(email: string): Promise<Student> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "SELECT * FROM students WHERE email=?;";

      const results = await conn.query(query, [email]);

      const students: Student[] = Object.values(
        JSON.parse(JSON.stringify(results))
      );
      return students[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneExeptMeByEmail(
    studentId: string,
    email: string
  ): Promise<Student> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "SELECT * FROM students WHERE id!=? AND email=?;";

      const results = await conn.query(query, [studentId, email]);

      const students: Student[] = Object.values(
        JSON.parse(JSON.stringify(results))
      );
      return students[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneExeptMeByNickname(
    studentId: string,
    nickname: string
  ): Promise<Student> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "SELECT * FROM students WHERE id!=? AND nickname=?;";

      const results = await conn.query(query, [studentId, nickname]);

      const students: Student[] = Object.values(
        JSON.parse(JSON.stringify(results))
      );
      return students[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findAllByName(name: string): Promise<Student[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "SELECT * FROM students WHERE name=?;";

      const results = await conn.query(query, [name]);

      const students: Student[] = Object.values(
        JSON.parse(JSON.stringify(results))
      );
      return students;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findAllByIdAndEmailAndNickname(
    id: string,
    email: string,
    nickname: string
  ): Promise<Student[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "SELECT * FROM students WHERE id=? OR email=? OR nickname=?;";

      const results = await conn.query(query, [id, email, nickname]);

      const students: Student[] = Object.values(
        JSON.parse(JSON.stringify(results))
      );
      return students;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async save(client: any): Promise<Student> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "INSERT INTO students(id, major_no, name, nickname, email, psword, salt) VALUES(?, ?, ?, ?, ?, ?, ?);";

      const result = await conn.query(query, [
        client.id,
        client.major,
        client.name,
        client.nickname,
        client.email,
        client.psword,
        client.salt,
      ]);

      return result;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async resetPassword(client: any): Promise<Student> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "UPDATE students SET psword=?, salt = ? WHERE id=?;";

      const result = await conn.query(query, [client.newPsword, client.newSalt, client.id]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

export default StudentStorage;
