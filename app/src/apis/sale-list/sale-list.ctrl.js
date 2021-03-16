const SaleList = require("../../models/services/SaleList/SaleList.js");

const output = {
  read: async (req, res) => {
    const student = new SaleList(req.params.studentId);
    const response = await student.read();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },
};

module.exports = output;
