import { Request, Response } from "express";
import logger from "../../config/logger";
import Board from "../../models/services/Board/Board";

interface saleList {
  num: number;
  sellerName: string;
  profilePath: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  categoryName: string;
  commentCount: number;
  inDate: Date;
}

interface response {
  success?: boolean;
  isError?: boolean;
  clientMsg?: string;
  saleLists?: saleList[];
  errMsg?: string;
  msg?: string;
}

const process = {
  readAll: async (req: Request, res: Response): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.findAllForMobile();
    if (response.isError) {
      logger.error(`GET /api/mobile/main 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`GET /api/mobile/main 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/mobile/main 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

export default process;
