`use strict`;

const PurchaseList = require("../../models/services/PurchaseList/PurchaseList");

const output = {
  findPurchaseList: async (req, res) => {
    const student = new PurchaseList(req.body.studentId);
    const response = await student.read();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const purchaseList = new PurchaseList(req.body);
    const response = await purchaseList.update();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
