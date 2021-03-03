`use strict`;

const WatchList = require("../models/WatchList");

const output = {
  showWatchList: async (req, res, next) => {
    const student = new WatchList(req.params.studentId);
    const response = await student.show();
    if (!response.success) return res.status(409).json(response);
    return res.status(200).json(response);
  },
};

const process = {
  insertProduct: async (req, res, next) => {
    const addcart = new WatchList(req.body);
    const response = await addcart.product();
    if (!response.success) return res.status(409).json(response);
    return res.status(200).json(response);
  },

  deleteProduct: async (req, res, next) => {
    const remove = new WatchList(req.body);
    const response = await remove.productList();
    if (!response.success) return res.status(409).json(response);
    return res.status(200).json(response);
  },
};

module.exports = { output, process };
