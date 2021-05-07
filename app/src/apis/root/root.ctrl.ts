import { Request, Response } from "express";
import logger from "../../config/logger";

import Student from "../../models/services/Student/Student";
import Email from "../../models/services/Email/Email";
import Error from "../../models/utils/Error";

interface response {
  success: boolean;
  msg: string;
  jwt?: string;
  id?: string;
}

interface iStudent {
  id?: string;
  major_no?: number;
  name?: string;
  nickname?: string;
  email?: string;
  psword?: string;
  salt?: string;
  profile_path?: string;
  admin_flag?: string;
  in_date?: string;
  err?: string;
  iat?: number;
  exp?: number;
}

const auth = {
  resAuthorizedStudentInfo: (req: Request, res: Response) => {
    // 인증 미들웨어를 통과했으므로 인증된 사용자이다.
    // 따라서 유저 정보를 응답한다.
    const auth: iStudent = req.auth;
    delete auth.iat;
    delete auth.exp;

    return res.status(200).json({
      success: true,
      msg: "로그인된 사용자입니다. 서비스 이용이 가능합니다.",
      auth,
    });
  },

  resUnAuthorizedInfo: (req: Request, res: Response) => {
    // 비인증 미들웨어를 통과했으므로 비인증된 사용자이다.
    return res.status(200).json({
      success: true,
      msg: "로그인되지 않은 사용자입니다. 서비스 이용이 가능합니다.",
    });
  },
};

const process = {
  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const student = new Student(req);
      const response = (await student.login()) as response;
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

  signup: async (req: Request, res: Response): Promise<Response> => {
    try {
      const student = new Student(req);
      const response = (await student.signup()) as response;
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

  sendEmailForId: async (req: Request, res: Response): Promise<Response> => {
    try {
      const email = new Email(req);
      const response = (await email.sendId()) as response;
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

  sendEmailForPsword: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const email = new Email(req);
      const response = (await email.sendLinkForPsword()) as response;
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

  resetPsword: async (req: Request, res: Response): Promise<Response> => {
    try {
      const student = new Student(req);
      const response = (await student.resetPassword()) as response;
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

export default {
  auth,
  process,
};
