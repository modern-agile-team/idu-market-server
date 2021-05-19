/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { params } from "../../../config/types";
import Error from "../../utils/Error";
import Auth from "../Auth/Auth";
import StudentStorage from "../Student/StudentStorage";
import ProfileStorage from "./ProfileStorage";

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

interface profile {
  id: string;
  name: string;
  nickname: string;
  email: string;
  profilePath: string;
  major: string;
}

interface response {
  success: boolean;
  msg: string;
  profile?: profile;
}
interface updateImage extends response {
  profilePath?: string;
  jwt?: string;
}

interface updateResponse {
  success: boolean;
  email: string;
  nickname: string;
  majorNum: number;
  msg: string;
}

class Profile {
  params: params;
  body: any;

  constructor(readonly req: Request) {
    this.params = req.params;
    this.body = req.body;
  }

  async findOneById(): Promise<error | response> {
    const studentId = this.params.studentId;
    try {
      const profile = await ProfileStorage.findOneById(studentId);
      if (profile) {
        const response = profile;
        return {
          success: true,
          profile: response,
          msg: "프로필 조회 완료되었습니다.",
        };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async update(): Promise<error | updateResponse | response> {
    const user = this.body;
    const studentId = this.params.studentId;

    try {
      const isExistEmail = await StudentStorage.findOneExeptMeByEmail(
        studentId,
        user.email
      );
      if (isExistEmail)
        return { success: false, msg: "이미 존재하는 이메일입니다." };

      const isExistNickname = await StudentStorage.findOneExeptMeByNickname(
        studentId,
        user.nickname
      );
      if (isExistNickname)
        return { success: false, msg: "이미 존재하는 닉네임입니다." };

      const isUpdate = await ProfileStorage.update(user, studentId);

      if (isUpdate) {
        return {
          success: true,
          email: user.email,
          nickname: user.nickname,
          majorNum: user.majorNum,
          msg: "정상적으로 수정되었습니다.",
        };
      }
      return {
        success: false,
        msg: "업데이트에 실패하셨습니다. 서버 개발자에게 문의해주십시오.",
      };
    } catch (err) {
      return Error.ctrl(
        "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
        err
      );
    }
  }

  async updateImage(): Promise<error | updateImage> {
    const image = this.body.profilePath;
    const studentId = this.params.studentId;
    try {
      const response = await ProfileStorage.updateImage(image, studentId);
      if (response) {
        const user = await StudentStorage.findOneById(studentId);
        const jwt = await Auth.createJWT(user);
        return {
          success: true,
          msg: "정상적으로 이미지가 수정되었습니다.",
          profilePath: image,
          jwt,
        };
      }
      return { success: false, msg: "서버 개발자에게 문의해주십시오" };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

export default Profile;
