`use strict`;

const SaleList = require("../../models/services/saleList/SaleList.js");

const output = {
  findSaleList: async (req, res) => {
    const student = new SaleList(req.body.studentId);
    const response = await student.find();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

const process = {
  update: async (req, res, next) => {
    const saleList = new SaleList(req.body);
    const response = await saleList.update();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
