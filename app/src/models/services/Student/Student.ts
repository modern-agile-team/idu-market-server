import { Request, Response } from "express";

import StudentStorage from "./StudentStorage";
import Auth from "../Auth/Auth";
import AuthStorage from "../Auth/AuthStorage";
import Error from "../../utils/Error";
import Cryptor from "../../utils/Cryptor";

interface response {
  success: boolean;
  msg: string;
  jwt?: string;
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

interface Inspect {
  saveable: boolean;
  msg: string;
}

interface Useable {
  useable: boolean;
  msg: string;
}

interface Exist {
  isExist: boolean;
  msg: string;
}

class Student {
  private body: any;

  constructor(req: Request) {
    this.body = req.body;
  }

  async login(): Promise<error | response> {
    const client: any = this.body;

    try {
      let student = await StudentStorage.findOneById(client.id);

      if (student) {
        client.psword = await Cryptor.encryptBySalt(
          client.psword,
          student.salt || ""
        );

        if (student.id === client.id && student.psword === client.psword) {
          const jwt = await Auth.createJWT(student);
          return { success: true, msg: "로그인에 성공하셨습니다.", jwt };
        }
        return { success: false, msg: "잘못된 비밀번호입니다." };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async signup(): Promise<error | response> {
    const client: any = this.body;

    try {
      const inspector = await this.inspectIdAndEmailAndNickname();

      if (inspector.saveable) {
        const { hash, salt } = await Cryptor.encrypt(client.psword);
        client.psword = hash;
        client.salt = salt;

        const isSave = await StudentStorage.save(client);
        if (isSave)
          return { success: true, msg: "회원가입이 정상 처리 되었습니다." };
      }
      return { success: inspector.saveable, msg: inspector.msg };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async resetPassword(): Promise<error | response> {
    const client: any = this.body;

    try {
      const authInfo: Useable = await Auth.useableId(client.id);
      if (!authInfo.useable)
        return { success: authInfo.useable, msg: authInfo.msg };

      const isReset = await StudentStorage.resetPassword(client);
      if (isReset) {
        const isDeleteToken = await AuthStorage.deleteTokenByStudentId(
          client.id
        );
        if (isDeleteToken) {
          return { success: true, msg: "비밀번호가 변경되었습니다." };
        }
      }
      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
      };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async inspectIdAndEmailAndNickname(): Promise<Inspect> {
    const client: any = this.body;

    const students = await StudentStorage.findAllByIdAndEmailAndNickname(
      client.id,
      client.email,
      client.nickname
    );

    if (students.length === 0) {
      return { saveable: true, msg: "회원가입이 가능합니다." };
    } else {
      for (let student of students) {
        if (student.id === client.id) {
          return { saveable: false, msg: "이미 존재하는 아이디 입니다." };
        } else if (student.email === client.email) {
          return { saveable: false, msg: "이미 가입된 이메일 입니다." };
        } else if (student.nickname === client.nickname)
          return { saveable: false, msg: "이미 사용되고 있는 이름 입니다." };
      }
    }

    return {
      saveable: false,
      msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
    };
  }

  async isExistIdAndEmail(): Promise<Exist> {
    const client: any = this.body;
    const student = await StudentStorage.findOneByIdAndEmail(
      client.id,
      client.email
    );

    if (student) {
      if (student.id !== client.id)
        return { isExist: false, msg: "등록되지 않은 아이디 입니다." };
      else if (student.email !== client.email)
        return { isExist: false, msg: "등록되지 않은 이메일 입니다." };
      else return { isExist: true, msg: "이미 등록되어 있습니다." };
    }
    return { isExist: false, msg: "등록되지 않은 아이디 입니다." };
  }
}

export default Student;
