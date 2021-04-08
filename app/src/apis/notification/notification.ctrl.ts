import { Request, Response } from "express";

import Email from "../../models/services/Email/Email";
import logger from "../../config/logger";

interface response {
  success?: boolean;
  isError?: boolean;
  clientMsg?: string;
  errMsg?: string;
  msg?: string;
  profilePath?: string;
}

const process = {
  notify: async (req: Request, res: Response): Promise<Response> => {
    const email = new Email(req);
    const response: response = await email.sendNotification();
    if (response.isError) {
      logger.error(`GET /api/notification 400 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
    if (response) {
      logger.info(`POST /api/notification 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`POST /api/notification 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

export default {
  process,
};
