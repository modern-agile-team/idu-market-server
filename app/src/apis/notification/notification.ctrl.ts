import { Request, Response } from "express";

import Email from "../../models/services/Email/Email";
import logger from "../../config/logger";
import Notification from "../../models/services/Notification/Notification";

interface response {
  success?: boolean;
  isError?: boolean;
  clientMsg?: string;
  errMsg?: string;
  msg?: string;
  profilePath?: string;
}

const process = {
  find: async (req: Request, res: Response): Promise<Response> => {
    const notification = new Notification(req);
    const response: response = await notification.findAllbyNickname();
    if (response.success) {
      logger.info(`GET api/notifications/studentId 200 ${response.msg}`);
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(`GET api/notifications/studentId 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.info(`GET api/notifications/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    const notification = new Notification(req);
    const response: response = await notification.updateReadFlag();
    if (response.success) {
      logger.info(`PATCH api/notifications/studentId 201 ${response.msg}`);
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(`PATCH api/notifications/studentId 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.info(`PATCH api/notifications/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

export default {
  process,
};
