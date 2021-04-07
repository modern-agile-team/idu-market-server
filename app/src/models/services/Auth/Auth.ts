import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

import AuthStorage from "./AuthStorage";
import Error from "../../utils/Error";

interface Student {
  id?: string;
  email?: string;
  name?: string;
  profile_path?: string;
  admin_flag?: number;
  err?: string;
}

class Auth {
  static TOKEN_INVALID = "invalid token";
  static TOKEN_EXPIRED = "jwt expired";

  static async createJWT(student: Student): Promise<string> {
    const payload = {
      id: student.id,
      email: student.email,
      name: student.name,
      profilePath: student.profile_path,
      isAdmin: student.admin_flag,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || "", {
      algorithm: "HS256",
      expiresIn: "1d",
      issuer: "wooahan agile",
    });
  }

  static async verifyJWT(token: string): Promise<Student> {
    try {
      // verify를 통해 값 decode!
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as Student;
      return decoded;
    } catch (err) {
      return { err };
    }
  }

  static async createToken(id: string): Promise<string | object> {
    try {
      const token = crypto.randomBytes(30).toString("hex").slice(0, 30); // token 생성
      const student = {
        token,
        id,
      };

      const isSave = await AuthStorage.saveToken(student);
      if (isSave) return { success: true, token };
      return { success: false, msg: "토큰 생성에 실패하셨습니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  static async useableId(id: string): Promise<string | object> {
    const auth = await AuthStorage.findOneByStudentId(id);
    if (auth) {
      return {
        useable: true,
        msg: "등록된 토큰입니다.",
      };
    }
    return {
      useable: false,
      msg:
        "미등록된 토큰이거나 유효시간(20분)이 만료되었습니다. 비밀번호 찾기를 다시 시도해주십시오.",
    };
  }
}

export default Auth;
