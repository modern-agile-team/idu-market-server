import { Request, Response } from "express";
import logger from "../../config/logger";
import Profile from "../../models/services/Profile/Profile";

interface response {
  success?: boolean;
  isError?: boolean;
  clientMsg?: string;
  errMsg?: string;
  msg?: string;
  profilePath?: string;
}

const process = {
  findOneById: async (req: Request, res: Response): Promise<Response> => {
    const profile = await new Profile(req);
    const response: response = await profile.findOneById();
    if (response.isError) {
      logger.error(`GET /api/students/studentId 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`GET /api/students/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/students/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    const profile = await new Profile(req);
    const response: response = await profile.update();
    if (response.isError) {
      logger.error(`PUT /api/students/studentId 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`PUT /api/students/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`PUT /api/students/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },

  updateImage: async (req: Request, res: Response): Promise<Response> => {
    const profile = await new Profile(req);
    const response: response | undefined = await profile.updateImage();
    if (response.isError) {
      logger.error(`PATCH /api/students/studentId 409 ${response.errMsg}`);
      return res.status(409).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`PATCH /api/students/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`PATCH /api/students/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

export default process;
