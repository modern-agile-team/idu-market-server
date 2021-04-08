import { Request, Response } from "express";
import logger from "../../config/logger";
import Comment from "../../models/services/Board/Comment/Comment";

interface response {
  success?: boolean;
  msg?: string;
  isError?: boolean;
  errMsg?: string;
  clientMsg?: string;
}

const process = {
  createByBoardNum: async (req: Request, res: Response): Promise<Response> => {
    const comment = new Comment(req);
    const response: response = await comment.createByBoardNum();
    if (response.success) {
      logger.info(`POST /api/boards/categoryName/num 201 ${response.msg}`);
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(`POST /api/boards/categoryName/num 500 ${response.errMsg}`);
      return res.status(500).json(response);
    }
    logger.error(`POST /api/boards/categoryName/num 400 ${response.msg}`);
    res.status(400).json(response);
  },

  createReplyByGroupNum: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const comment = new Comment(req);
    const response: response = await comment.createReplyByGroupNum();
    if (response.success) {
      logger.info(
        `POST /api/boards/categoryName/num/groupNum 201 ${response.msg}`
      );
      return res.status(201).json(response);
    }
    if (response.isError) {
      logger.error(
        `POST /api/boards/categoryName/num/groupNum 500 ${response.errMsg}`
      );
      return res.status(500).json(response.clientMsg);
    }
    logger.info(
      `POST /api/boards/categoryName/num/groupNum 400 ${response.msg}`
    );
    return res.status(400).json(response);
  },

  updateByNum: async (req: Request, res: Response): Promise<Response> => {
    const comment = new Comment(req);
    const response: response = await comment.updateByNum();
    if (response.success) {
      logger.info(
        `PATCH /api/boards/categoryName/num/commentNum 200 ${response.msg}`
      );
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(
        `PATCH /api/boards/categoryName/num/commentNum 500 ${response.errMsg}`
      );
      return res.status(500).json(response.clientMsg);
    }
    logger.info(
      `PATCH /api/boards/categoryName/num/commentNum 400 ${response.msg}`
    );
    return res.status(400).json(response);
  },

  deleteByNum: async (req: Request, res: Response): Promise<Response> => {
    const comment = new Comment(req);
    let response: response = {};
    if (req.body.depth === 0) {
      response = await comment.deleteCommentByNum();
    } else {
      response = await comment.deleteReplyByNum();
    }
    if (response.success) {
      logger.info(
        `DELETE /api/boards/categoryName/num/commentNum 200 ${response.msg}`
      );
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(
        `DELETE /api/boards/categoryName/num/commentNum 500 ${response.errMsg}`
      );
      return res.status(500).json(response.clientMsg);
    }
    logger.info(
      `DELETE /api/boards/categoryName/num/commentNum 400 ${response.msg}`
    );
    return res.status(400).json(response);
  },

  findStudentIdByNum: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const comment = new Comment(req);
    const response: response = await comment.findStudentIdByNum();
    if (response.success) {
      logger.info(
        `GET /api/boards/categoryName/num/comments 200 ${response.msg}`
      );
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(
        `GET /api/boards/categoryName/num.comments 500 ${response.errMsg}`
      );
      return res.status(500).json(response.clientMsg);
    }
    logger.info(
      `GET /api/boards/categoryName/num.comments 400 ${response.msg}`
    );
    return res.status(400).json(response);
  },
};

export { process };
