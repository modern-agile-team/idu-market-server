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
    if (response.isError) {
      logger.error(`POST api/boards/categoryName 400 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
    logger.info(`POST api/boards/categoryName 500 ${response.msg}`);
    return res.status(500).json(response);
  },

  findAllByCategoryNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findAllByCategoryNum();
    if (response.success) {
      logger.info(`GET api/boards/categoryName 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`GET api/boards/categoryName 400 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
    logger.error(`GET api/boards/categoryName 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  findOneByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findOneByNum();
    if (response.success) {
      logger.info(`GET /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`GET /api/boards/categoryName/num 400 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
  },

  updateByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateByNum();
    if (response.success) {
      logger.info(`PUT /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`PUT /api/boards/categoryName/num 400 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
  },

  updateOnlyHit: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateOnlyHit();
    if (response.success) {
      logger.info(`PATCH /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(`PATCH /api/boards/categoryName/num 400 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
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
    if (response.isError) {
      logger.error(
        `PATCH /api/boards/categoryName/num/status 400 ${response.errMsg}`
      );
      return res.status(400).json(response.clientMsg);
    }
  },

  deleteByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.deleteByNum();
    if (response.success) {
      logger.info(`DELETE /api/boards/categoryName/num 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    if (response.isError) {
      logger.error(
        `DELETE /api/boards/categoryName/num 400 ${response.errMsg}`
      );
      return res.status(400).json(response.clientMsg);
    }
  },
};

module.exports = {
  process,
};
