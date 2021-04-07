const nodemailer = require("nodemailer");

const User = require("../User/User");
const UserStorage = require("../User/UserStorage");
const Auth = require("../Auth/Auth");
const mailOption = require("../../../config/mail");
const error = require("../../utils/Error");

const CHANGE_PSWORD_URL = process.env.CHANGE_PASSWORD_URL;

class Email {
  constructor(req) {
    this.req = req;
    this.body = req.body;
  }

  async sendId() {
    try {
      const client = this.body;
      const users = await UserStorage.findAllByName(client.name);
      if (users.length === 0)
        return { success: false, msg: "등록되지 않은 이름 입니다." };

      const user = await UserStorage.findOneByEmail(client.email);
      if (!user) return { success: false, msg: "등록되지 않은 이메일 입니다." };

      const promise = new Promise((resolve, reject) => {
        try {
          const message = {
            from: process.env.MAIL_EMAIL,
            to: client.email,
            subject: `[idu-market] ${client.name}님의 아이디가 도착했습니다.`,
            html: `<p><b>${client.name}</b>님의 아이디는 <b>${user.id}</b> 입니다.</p>`,
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

      return promise.then((res) => res);
    } catch (err) {
      return error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async sendLinkForPsword() {
    const req = this.req;
    const client = this.body;
    try {
      const user = new User(req);
      const existInfo = await user.isExistIdAndEmail();
      if (!existInfo.isExist) return existInfo;

      const userInfo = await UserStorage.findOneById(client.id);
      if (!userInfo)
        return { success: false, msg: "등록되지 않은 아이디 입니다." };

      const tokenInfo = await Auth.createToken(client.id);
      if (!tokenInfo.success) return tokenInfo;

      const promise = new Promise((resolve, reject) => {
        try {
          const message = {
            from: process.env.MAIL_EMAIL,
            to: client.email,
            subject: `[idu-market] ${client.id}님께 비밀번호 변경 링크가 도착했습니다.`,
            html: `<p>안녕하십니까, <b>${client.id}</b>님. <br> 비밀번호를 변경하시려면 하단 링크를 클릭해주십시오. <br> <a href="${CHANGE_PSWORD_URL}/${tokenInfo.token}">변경하기</a></p>`,
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

      return promise.then((res) => res);
    } catch (err) {
      return error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async sendNotification() {
    try {
      const client = this.body;
      const user = await UserStorage.findOneById(client.studentId);
      if (!user) {
        return {
          success: false,
          msg: "존재하지 않는 아이디입니다. 메일 전송에 실패하셨습니다.",
        };
      }

      const promise = new Promise((resolve, reject) => {
        try {
          const message = {
            from: process.env.MAIL_EMAIL,
            to: user.email,
            subject: `[idu-market] ${user.name}님에게 댓글이 달렸습니다.`,
            html: `<p>[idu-market] <b>${user.name}</b>님에게 댓글이 달렸습니다.</p>
              <p>댓글을 확인하시려면 아래 링크로 이동하십시오.</p>
              <p><a href=${client.url}>${client.categoryName}</a></p>`,
          };

          const transporter = nodemailer.createTransport(mailOption);

          transporter.sendMail(message);
          resolve({
            success: true,
            msg: `${user.id}님께 메일 알림이 전송되었습니다.`,
          });
        } catch (err) {
          reject(err);
        }
      });

      return promise.then((res) => res);
    } catch (err) {
      return error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

module.exports = Email;
