const Comment = require("../../models/services/Board/Comment/Comment");

const process = {
  createByBoardNum: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.createByBoardNum(req);
    if (response.success) return res.status(201).json(response);
    res.status(400).json(response);
  },

  createReplyByGroupNum: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.createReplyByGroupNum(req);
    if (response.success) return res.status(201).json(response);
    res.status(400).json(response);
  },

  updateByNum: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.updateByNum();
    if (response.success) return res.status(200).json(response);
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
    if (response.success) return res.status(200).json(response);
    res.status(400).json(response);
  },
};

module.exports = {
  process,
};
