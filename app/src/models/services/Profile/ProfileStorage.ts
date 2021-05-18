import mariadb from "../../../config/mariadb";

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
  static async findOneById(id: string): Promise<profile> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT st.id, st.name, st.nickname, st.email, 
      st.profile_path AS profilePath, majors.name AS major
      FROM students st
      JOIN majors
      ON st.major_no = majors.no
      where st.id= ?;`;

      const profile = await conn.query(query, [id]);
      const user: profile[] = Object.values(
        JSON.parse(JSON.stringify(profile))
      );
      return user[0];
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateImage(image: string, studentId: string): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "UPDATE students st SET st.profile_path = ? WHERE st.id = ?";

      const rows = await conn.query(query, [image, studentId]);
      return rows.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateAll(body: body, studentId: string): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `UPDATE students st
      SET st.email = ?, st.nickname = ?, st.major_no = ?
      WHERE st.id = ?;`;

      const rows = await conn.query(query, [
        body.email,
        body.nickname,
        body.majorNum,
        studentId,
      ]);
      return rows.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async update(user: body, studentId: string): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query =
        "UPDATE students SET email = ?, nickname = ?, major_no = ? WHERE id = ?;";

      const rows = await conn.query(query, [
        user.email,
        user.nickname,
        user.majorNum,
        studentId,
      ]);
      return rows.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async updateNicknameAndMajor(
    body: body,
    studentId: string
  ): Promise<number> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `UPDATE students st
      SET st.nickname = ?, st.major_no = ?
      WHERE st.id = ?`;

      const rows = await conn.query(query, [
        body.nickname,
        body.majorNum,
        studentId,
      ]);
      return rows.affectedRows;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findAllByEmailAndNickname(
    email: string,
    nickname: string
  ): Promise<findEmailAndNickname[]> {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = "SELECT * FROM students WHERE email=? OR nickname=?;";

      const user = await conn.query(query, [email, nickname]);

      const users: findEmailAndNickname[] = Object.values(
        JSON.parse(JSON.stringify(user))
      );
      return users;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

export default ProfileStorage;
