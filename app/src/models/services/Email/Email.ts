import { Request, Response } from "express";
import * as nodemailer from "nodemailer";

import Student from "../Student/Student";
import StudentStorage from "../Student/StudentStorage";
import Auth from "../Auth/Auth";
import Error from "../../utils/Error";

import mailOption from "../../../config/mail";

const CHANGE_PSWORD_URL: string = process.env.CHANGE_PASSWORD_URL || "";

interface response {
  success: boolean;
  msg: string;
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

class Email {
  private req: Request;
  private body: any;

  constructor(req: Request) {
    this.req = req;
    this.body = req.body;
  }

  async sendId(): Promise<error | response> {
    try {
      const client: any = this.body;
      const students = await StudentStorage.findAllByName(client.name);
      if (students.length === 0)
        return { success: false, msg: "등록되지 않은 이름 입니다." };

      const student = await StudentStorage.findOneByEmail(client.email);
      if (!student)
        return { success: false, msg: "등록되지 않은 이메일 입니다." };

      return new Promise((resolve, reject) => {
        try {
          const message = {
            from: process.env.MAIL_EMAIL,
            to: client.email,
            subject: `[idu-market] ${client.name}님의 아이디가 도착했습니다.`,
            html: `<p><b>${client.name}</b>님의 아이디는 <b>${student.id}</b> 입니다.</p>`,
          };

          const transporter = nodemailer.createTransport(mailOption);

          transporter.sendMail(message);
          resolve({
            success: true,
            msg: "입력된 이메일로 ID가 발송되었습니다.",
          });
        } catch (err) {
          reject(err);
        }
      });
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async sendLinkForPsword(): Promise<error | response> {
    const req = this.req;
    const client: any = this.body;
    try {
      const student = new Student(req);
      const existInfo = await student.isExistIdAndEmail();
      if (!existInfo.isExist)
        return { success: existInfo.isExist, msg: existInfo.msg };

      const studentInfo = await StudentStorage.findOneById(client.id);
      if (!studentInfo)
        return { success: false, msg: "등록되지 않은 아이디 입니다." };

      const tokenInfo = await Auth.createToken(client.id);
      if (!("token" in tokenInfo) && "msg" in tokenInfo)
        return { success: false, msg: tokenInfo.msg };

      return new Promise((resolve, reject) => {
        try {
          const message = {
            from: process.env.MAIL_EMAIL,
            to: client.email,
            subject: `[idu-market] ${client.id}님께 비밀번호 변경 링크가 도착했습니다.`,
            html: `<p>안녕하십니까, <b>${
              client.id
            }</b>님. <br> 비밀번호를 변경하시려면 하단 링크를 클릭해주십시오. <br> <a href="${CHANGE_PSWORD_URL}/${
              "token" in tokenInfo ? tokenInfo.token : ""
            }">변경하기</a></p>`,
          };

          const transporter = nodemailer.createTransport(mailOption);
          transporter.sendMail(message);
          resolve({
            success: true,
            msg: "이메일로 발송된 URL을 통해 비밀번호를 재설정 할 수 있습니다.",
          });
        } catch (err) {
          reject({ success: false, err: String(err) });
        }
      });
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async sendNotification(): Promise<error | response> {
    try {
      const client: any = this.body;
      const student = await StudentStorage.findOneById(client.studentId);
      if (!student) {
        return {
          success: false,
          msg: "존재하지 않는 아이디입니다. 메일 전송에 실패하셨습니다.",
        };
      }

      return new Promise((resolve, reject) => {
        try {
          const message = {
            from: process.env.MAIL_EMAIL,
            to: student.email,
            subject: `[idu-market] ${student.name}님에게 댓글이 달렸습니다.`,
            html: `<p>[idu-market] <b>${student.name}</b>님에게 댓글이 달렸습니다.</p>
              <p>댓글을 확인하시려면 아래 링크로 이동하십시오.</p>
              <p><a href=${client.url}>${client.categoryName}</a></p>`,
          };

          const transporter = nodemailer.createTransport(mailOption);

          transporter.sendMail(message);
          resolve({
            success: true,
            msg: `${student.id}님께 메일 알림이 전송되었습니다.`,
          });
        } catch (err) {
          reject(err);
        }
      });
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

export default Email;
