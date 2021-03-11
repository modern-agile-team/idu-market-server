"use strict";

const Board = require("../../models/services/Board/Board");

const process = {
  createByCategoryName: async (req, res) => {
    const board = new Board(req);
    const response = await board.createByCategoryName();
    if (response.success) return res.status(201).json(response);
    res.status(400).json(response);
  },

  findAllByCategoryName: async (req, res) => {
    const board = new Board(req);
    const response = await board.findAllByCategoryName();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },

  detailFindOneByCategoryName: async (req, res) => {
    const board = new Board(req);
    const response = await board.detailFindOneByCategoryName();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },

  updateByNo: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateByNo();
    if (response.success) return res.status(201).json(response);
    res.status(409).json(response);
  },

  deleteByNo: async (req, res) => {
    const board = new Board(req);
    const response = await board.deleteByNo();
    if (response.success) return res.status(201).json(response);
    res.status(400).json(response);
  },
};

module.exports = {
  process,
};
