"use strict";

const Board = require("../../models/services/Board/Board");

const process = {
  createByCategoryName: async (req, res) => {
    const board = new Board(req);
    const response = await board.createByCategoryName();
    if (response.success) return res.status(201).json(response);
    res.status(400).json(response);
  },

  findAllByCategoryNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findAllByCategoryNum();
    if (response.success) return res.status(200).json(response);
    return res.status(404).json(response);
  },

  findOneByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.findOneByNum();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },

  findAllByNum: async (req, res) => {
    const student = new Board(req);
    const response = await student.findAllByNum();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },

  updateByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateByNum();
    if (response.success) return res.status(200).json(response);
    res.status(409).json(response);
  },

  updateOnlyHit: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateOnlyHit();
    if (response.success) return res.status(200).json(response);
    res.status(400).json(response);
  },

  updateOnlyStatus: async (req, res) => {
    const board = new Board(req);
    const response = await board.updateOnlyStatus();
    if (response.success) return res.status(200).json(response);
    res.status(400).json(response);
  },

  deleteByNum: async (req, res) => {
    const board = new Board(req);
    const response = await board.deleteByNo();
    if (response.success) return res.status(200).json(response);
    res.status(400).json(response);
  },
};

module.exports = {
  process,
};
