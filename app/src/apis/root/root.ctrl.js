"use strict";

const User = require("../../models/services/User");
const Email = require("../../models/services/Email");

/* Node.js 기본 내장 모듈 불러오기 */
const fs = require("fs");

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.success)
      return res.cookie("x_auth", response.jwt).status(201).json(response);
    return res.status(400).json(response);
  },

  signup: async (req, res) => {
    const user = new User(req.body);
    const response = await user.signup();
    if (response.success) return res.status(201).json(response);
    return res.status(409).json(response);
  },

  sendEmailForId: async (req, res) => {
    const email = new Email(req.body);
    const response = await email.sendId();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },

  sendEmailForPsword: async (req, res) => {
    const email = new Email(req.body);
    const response = await email.sendLinkForPsword();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },

  resetPsword: async (req, res) => {
    const user = new User(req.body);
    const response = await user.resetPassword();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },

  server: (request, response) => {
    fs.readFile("public/index.html", function (err, data) {
      if (err) {
        response.send("에러");
        throw err;
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
      }
    });
  },

};

module.exports = {
  process,
};
