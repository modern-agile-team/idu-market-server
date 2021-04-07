const User = require("../../models/services/User/User");
const Email = require("../../models/services/Email/Email");
const logger = require("../../config/logger");
const Error = require("../../models/utils/Error");

const auth = {
  resAuthorizedUserInfo: (req, res) => {
    // 인증 미들웨어를 통과했으므로 인증된 사용자이다.
    // 따라서 유저 정보를 응답한다.
    const user = req.user;
    delete user.iat;
    delete user.exp;
    delete user.iss;

    res.status(200).json({
      success: true,
      msg: "로그인된 사용자입니다. 서비스 이용이 가능합니다.",
      user,
    });
  },

  resUnAuthorizedInfo: (req, res) => {
    // 비인증 미들웨어를 통과했으므로 비인증된 사용자이다.
    res.status(200).json({
      success: true,
      msg: "로그인되지 않은 사용자입니다. 서비스 이용이 가능합니다.",
    });
  },
};

const process = {
  login: async (req, res) => {
    try {
      const user = new User(req);
      const response = await user.login();
      if (response.success) {
        logger.info(`POST /api/jwt 201 ${response.msg}`);
        return res.status(201).json(response);
      }
      logger.error(`POST /api/jwt 400 ${response.msg}`);
      return res.status(400).json(response);
    } catch (err) {
      const server = Error.ctrl("서버 개발자에게 문의해주십시오", err);
      logger.error(`POST /api/jwt 500 ${server.errMsg}`);
      return res.status(500).json(server.clientMsg);
    }
  },

  signup: async (req, res) => {
    try {
      const user = new User(req);
      const response = await user.signup();
      if (response.success) {
        logger.info(`POST /api/student 201 ${response.msg}`);
        return res.status(201).json(response);
      }
      logger.error(`POST /api/student 409 ${response.msg}`);
      return res.status(409).json(response);
    } catch (err) {
      const server = Error.ctrl("서버 개발자에게 문의해주십시오", err);
      logger.error(`POST /api/student 500 ${server.errMsg}`);
      return res.status(500).json(server.clientMsg);
    }
  },

  sendEmailForId: async (req, res) => {
    try {
      const email = new Email(req);
      const response = await email.sendId();
      if (response.success) {
        logger.info(`POST /api/forgot-id 200 ${response.msg}`);
        return res.status(200).json(response);
      }
      logger.error(`POST /api/forgot-id 400 ${response.msg}`);
      return res.status(400).json(response);
    } catch (err) {
      const server = Error.ctrl("서버 개발자에게 문의해주십시오", err);
      logger.error(`POST /api/forgot-id 500 ${server.errMsg}`);
      return res.status(500).json(server.clientMsg);
    }
  },

  sendEmailForPsword: async (req, res) => {
    try {
      const email = new Email(req);
      const response = await email.sendLinkForPsword();
      if (response.success) {
        logger.info(`POST /api/forgot-password 200 ${response.msg}`);
        return res.status(200).json(response);
      }
      logger.error(`POST /api/forgot-password 400 ${response.msg}`);
      return res.status(400).json(response);
    } catch (err) {
      const server = Error.ctrl("서버 개발자에게 문의해주십시오", err);
      logger.error(`POST /api/forgot-password 500 ${server.errMsg}`);
      return res.status(500).json(server.clientMsg);
    }
  },

  resetPsword: async (req, res) => {
    try {
      const user = new User(req);
      const response = await user.resetPassword();
      if (response.success) {
        logger.info(`PATCH /api/password 200 ${response.msg}`);
        return res.status(200).json(response);
      }
      logger.error(`PATCH /api/password 400 ${response.msg}`);
      return res.status(400).json(response);
    } catch (err) {
      const server = Error.ctrl("서버 개발자에게 문의해주십시오", err);
      logger.error(`PATCH /api/password 500 ${server.errMsg}`);
      return res.status(500).json(server.clientMsg);
    }
  },
};

module.exports = {
  auth,
  process,
};
