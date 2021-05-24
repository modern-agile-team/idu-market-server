import { Request, Response } from "express";
import logger from "../../config/logger";
import Board from "../../models/services/Board/Board";

interface response {
  success?: boolean;
  msg?: string;
  isError?: boolean;
  errMsg?: string;
  clientMsg?: string;
}

const process = {
  createByCategoryName: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.createByCategoryName();
    if (response.success) {
      logger.info(`POST api/boards/categoryName 201 ${response.msg}`);
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(`POST api/boards/categoryName 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.info(`POST api/boards/categoryName 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  findAllByCategoryNum: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.findAllByCategoryNum();
    if (response.success) {
      logger.info(`GET api/boards/categoryName 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`GET api/boards/categoryName 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`GET api/boards/categoryName 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  findOneByNum: async (req: Request, res: Response): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.findOneByNum();
    if (response.success) {
      logger.info(`GET /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`GET /api/boards/categoryName/num 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`GET /api/boards/categoryName/num 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  updateByNum: async (req: Request, res: Response): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.updateByNum();
    if (response.success) {
      logger.info(`PUT /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`PUT /api/boards/categoryName/num 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`PUT /api/boards/categoryName/num 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  updateOnlyHit: async (req: Request, res: Response): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.updateOnlyHit();
    if (response.success) {
      logger.info(`PATCH /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`PATCH /api/boards/categoryName/num 500 ${response.errMsg}`);
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`PATCH /api/boards/categoryName/num 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  updateOnlyStatus: async (req: Request, res: Response): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.updateOnlyStatus();
    if (response.success) {
      logger.info(
        `PATCH /api/boards/categoryName/num/status 200 ${response.msg}`
      );
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(
        `PATCH /api/boards/categoryName/num/status 500 ${response.errMsg}`
      );
      return res.status(500).json(response.clientMsg);
    }
    logger.error(
      `PATCH /api/boards/categoryName/num/status 400 ${response.msg}`
    );
    return res.status(400).json(response);
  },

  deleteByNum: async (req: Request, res: Response): Promise<Response> => {
    const board = new Board(req);
    const response: response = await board.deleteByNum();
    if (response.success) {
      logger.info(`DELETE /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(
        `DELETE /api/boards/categoryName/num 500 ${response.errMsg}`
      );
      return res.status(500).json(response.clientMsg);
    }
    logger.error(`DELETE /api/boards/categoryName/num 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

export { process };
