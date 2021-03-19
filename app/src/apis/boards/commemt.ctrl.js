const logger = require("../../config/logger");
const Comment = require("../../models/services/Board/Comment/Comment");

const process = {
  createByBoardNum: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.createByBoardNum(req);
    if (response.success) {
      logger.info(`POST /api/boards/categoryName/num 201 ${response.msg}`);
      return res.status(201).json(response);
    }
    logger.error(`POST /api/boards/categoryName/num 400 ${response.msg}`);
    res.status(400).json(response);
  },

  createReplyByGroupNum: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.createReplyByGroupNum(req);
    if (response.success) {
      logger.info(
        `POST /api/boards/categoryName/num/groupNum 201 ${response.msg}`
      );
      return res.status(201).json(response);
    }
    logger.error(
      `POST /api/boards/categoryName/num/groupNum 400 ${response.msg}`
    );
    res.status(400).json(response);
  },

  updateByNum: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.updateByNum();
    if (response.success) {
      logger.info(
        `PATCH /api/boards/categoryName/num/commentNum 200 ${response.msg}`
      );
      return res.status(200).json(response);
    }
    logger.error(
      `PATCH /api/boards/categoryName/num/commentNum 400 ${response.msg}`
    );
    res.status(400).json(response);
  },

  deleteByNum: async (req, res) => {
    const comment = new Comment(req);
    let response = {};
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
    logger.error(
      `DELETE /api/boards/categoryName/num/commentNum 400 ${response.msg}`
    );
    res.status(400).json(response);
  },
};

module.exports = {
  process,
};
