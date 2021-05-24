import { Request, Response } from "express";
import logger from "../../config/logger";
import WatchList from "../../models/services/WatchList/WatchList";

interface watchlist {
  num: number;
  studentId: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  sellerId: string;
  sellerName: string;
  categoryName: string;
  profilePath: string;
  commentCount: number;
  inDate: Date;
}

interface response {
  success?: boolean;
  isError?: boolean;
  clientMsg?: string;
  boards?: watchlist[];
  errMsg?: string;
  msg?: string;
}

const process = {
  findAllByStudentId: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const watchList = new WatchList(req);
    const response: response = await watchList.findAllByStudentId();
    if (response.isError) {
      logger.error(`GET /api/sale-list/studentId 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`GET /api/watchlist/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/sale-list/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    const watchList = new WatchList(req);
    const response: response = await watchList.create();
    if (response.isError) {
      logger.error(`POST /api/sale-list/studentId 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`POST /api/watchlist/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`POST /api/watchlist/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const watchList = new WatchList(req);
    const response: response = await watchList.delete();
    if (response.isError) {
      logger.error(`DELETE /api/sale-list/studentId 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`DELETE /api/watchlist/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`DELETE /api/watchlist/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

export default process;
