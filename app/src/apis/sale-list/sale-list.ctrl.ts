import { Request, Response } from "express";
import logger from "../../config/logger";
import SaleList from "../../models/services/SaleList/SaleList";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  read: async (req: Request, res: Response): Promise<Response> => {
    const student = new SaleList(req);
    const response: response = await student.read();
    if (response.isError) {
      logger.error(`GET /api/sale-list 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`GET /api/sale-list/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/sale-list/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

export default process;
