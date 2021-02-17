"use strict";

const nodemailer = require("nodemailer");

const User = require("./User");
const UserStorage = require("./UserStorage");
const mailOption = require("../../config/mail");

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
        const info = await transporter.sendMail(message);
        resolve({ success: true, mag: "입력된 이메일로 ID가 발송되었습니다." });
      } catch (err) {
        reject({ success: true, err: String(err) });
      }
    });
  }
}

module.exports = Email;
