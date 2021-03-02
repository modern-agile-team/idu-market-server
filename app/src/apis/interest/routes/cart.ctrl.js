`use strict`;

const Cart = require("../models/Cart");

const output = {
  showCart: async (req, res, next) => {
    const student = new Cart(req.params.studentId);
    const response = await student.shoppingBasket();
    if (!response.success) return res.status(409).json(response);
    return res.status(200).json(response);
  },
};

const process = {
  insertProduct: async (req, res, next) => {
    const addcart = new Cart(req.body);
    const response = await addcart.product();
    if (!response.success) return res.status(400).json(response);
    return res.status(200).json(response);
  },

  deleteProduct: async (req, res, next) => {
    const remove = new Cart(req.body);
    const response = await remove.productList();
    if (!response.success) return res.status(409).json(response);
    return res.status(200).json(response);
  },
};

module.exports = { output, process };
