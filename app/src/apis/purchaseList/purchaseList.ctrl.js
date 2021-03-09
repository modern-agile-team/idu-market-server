`use strict`;

const PurchaseList = require("../../models/services/purchaselist/PurchaseList");

const output = {
  findPurchaseList: async (req, res) => {
    const student = new PurchaseList(req.body.studentId);
    const response = await student.find();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output };
