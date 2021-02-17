"use strict";

const mail = {
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};

module.exports = mail;
