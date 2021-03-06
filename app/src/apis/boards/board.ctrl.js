'use strict'

const Board = require("../../models/services/boards/Board");

const process = {
    createByCodeName: async (req, res) => {
        const board = new Board(req);
        const response = await board.createByCodeName();
        if (response.success) return res.status(201).json(response);
        res.status(400).json(response);
    },
    
    findAllByCodeName: async (req, res) => {
        const board = new Board(req);
        const response = await board.findAllByCodeName();
        if (response.success) return res.status(200).json(response);
        return res.status(400).json(response);
    },

    detailFindOneByCodeName: async (req, res) => {
        const board = new Board(req);
        const response = await board.detailFindOneByCodeName();
        if (response.success) return res.status(200).json(response.data);
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
    }
}

module.exports = {
    process,
};