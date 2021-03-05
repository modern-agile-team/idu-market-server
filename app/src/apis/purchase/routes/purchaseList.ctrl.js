`use strict`;

const PurchaseList = require("../models/PurchaseList");

const output = {
    showPurchaseList: async (req, res) => {
      const student = new PurchaseList(req.params.studentId);
      const response = await student.show();
      if (!response.success) return res.status(409).json(response);
      return res.status(200).json(response);
    },
  };

  module.exports = { output, };