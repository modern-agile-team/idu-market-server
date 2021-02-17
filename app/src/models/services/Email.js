"use strict";

const nodemailer = require("nodemailer");

const User = require("./User");
const UserStorage = require("./UserStorage");
const Auth = require("./Auth");
const mailOption = require("../../config/mail");

const CHANGE_PSWORD_URL = "http://localhost/5000/reset/password";

class Email {
  constructor(body) {
    this.body = body;
  }

  async sendId() {
    const user = new User(this.body);
    const existInfo = await user.isExistNameAndEmail();
    if (!existInfo.isExist) return existInfo;

    const userInfo = await UserStorage.findOneByEmail(this.body.email);
    if (!userInfo)
      return { success: false, msg: "등록되지 않은 이메일 입니다." };
    return new Promise(async (resolve, reject) => {
      try {
        const message = {
          from: process.env.MAIL_EMAIL,
          to: this.body.email,
          subject: `[idu-market] ${this.body.name}님의 아이디가 도착했습니다.`,
          html: `<p><b>${this.body.name}</b>님의 아이디는 <b>${userInfo.id}</b> 입니다.</p>`,
        };

        const transporter = nodemailer.createTransport(mailOption);
        await transporter.sendMail(message);
        resolve({ success: true, mag: "입력된 이메일로 ID가 발송되었습니다." });
      } catch (err) {
        reject({ success: true, err: String(err) });
      }
    });
  }

  async sendLinkForPsword() {
    const client = this.body;

    const user = new User(client);
    const existInfo = await user.isExistIdAndEmail();
    if (!existInfo.isExist) return existInfo;

    const userInfo = await UserStorage.findOneById(client.id);
    if (!userInfo)
      return { success: false, msg: "등록되지 않은 아이디 입니다." };

    const tokenInfo = await Auth.createToken(client.id);
    if (!tokenInfo.success) return tokenInfo;

    return new Promise(async (resolve, reject) => {
      try {
        const message = {
          from: process.env.MAIL_EMAIL,
          to: client.email,
          subject: `[idu-market] ${client.id}님께 비밀번호 변경 링크가 도착했습니다.`,
          html: `<p>안녕하십니까, <b>${client.id}</b>님. <br> 비밀번호를 변경하시려면 하단 링크를 클릭해주십시오. <br> <a href="${CHANGE_PSWORD_URL}">변경하기</a></p>`,
        };

        const transporter = nodemailer.createTransport(mailOption);
        await transporter.sendMail(message);
        resolve({
          success: true,
          mag: "이메일로 발송된 URL을 통해 비밀번호를 재설정 할 수 있습니다.",
        });
      } catch (err) {
        reject({ success: true, err: String(err) });
      }
    });
  }
}

module.exports = Email;
