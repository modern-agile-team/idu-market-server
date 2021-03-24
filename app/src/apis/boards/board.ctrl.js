"use strict";

const logger = require("../../config/logger");
const Board = require("../../models/services/Board/Board");

const process = {
  createByCategoryName: async (req, res) => {
    const board = new Board(req);
    const response = await board.createByCategoryName();
    if (response.success) {
      logger.info(`POST api/boards/categoryName 201 ${response.msg}`);
      return res.status(201).json(response);
    }
    logger.error(`POST api/boards/categoryName 400 ${response.msg}`);
    res.status(400).json(response);
  },

  findAllByCategoryNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findAllByCategoryNum();
    if (response.success) {
      logger.info(`GET api/boards/categoryName 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET api/boards/categoryName 400 ${response.msg}`);
    res.status(400).json(response);
  },

  findOneByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findOneByNum();
    if (response.success) {
      logger.info(`GET /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/boards/categoryName/num 400 ${response.msg}`);
    res.status(400).json(response);
  },

  findStudentIdByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findStudentIdByNum();
    if (response.success) {
      logger.info(
        `GET /api/boards/categoryName/num/comment 200 ${response.msg}`
      );
      return res.status(200).json(response);
    }
    logger.error(
      `GET /api/boards/categoryName/num.comments 400 ${response.msg}`
    );
    res.status(400).json(response);
  },

  updateByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateByNum();
    if (response.success) {
      logger.info(`PUT /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`PUT /api/boards/categoryName/num 400 ${response.msg}`);
    res.status(400).json(response);
  },

  updateOnlyHit: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateOnlyHit();
    if (response.success) {
      logger.info(`PATCH /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`PATCH /api/boards/categoryName/num 400 ${response.msg}`);
    res.status(400).json(response);
  },

  updateOnlyStatus: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateOnlyStatus();
    if (response.success) {
      logger.info(
        `PATCH /api/boards/categoryName/num/status 200 ${response.msg}`
      );
      return res.status(200).json(response);
    }
    logger.error(
      `PATCH /api/boards/categoryName/num/status 400 ${response.msg}`
    );
    res.status(400).json(response);
  },

  deleteByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.deleteByNum();
    if (response.success) {
      logger.info(`DELETE /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`DELETE /api/boards/categoryName/num 400 ${response.msg}`);
    res.status(400).json(response);
  },
};

module.exports = {
  process,
};
