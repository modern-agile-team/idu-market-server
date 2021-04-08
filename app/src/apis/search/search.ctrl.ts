import { Request, Response } from "express";

import logger from "../../config/logger";
import Board from "../../models/services/Board/Board";

const process = {
  search: async (req: Request, res: Response): Promise<Response> => {
    const board = new Board(req);
    const response = await board.search();
    if (response.success) {
      logger.info(`GET /api/search 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    response.msg = "알 수 없는 응답입니다. 서버 개발자에게 문의해주십시오.";
    logger.error(`GET /api/search 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

export default {
  process,
};
