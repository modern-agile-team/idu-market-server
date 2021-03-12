const SaleList = require("../../models/services/SaleList/SaleList.js");

const output = {
  read: async (req, res) => {
    const student = new SaleList(req.body.studentId);
    const response = await student.read();
    if (response.success) return res.status(200).json(response);
    response.msg = "알수 없는 응답입니다. 서버 개발자에게 문의해주십시오";
    return res.status(400).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const saleList = new SaleList(req.body);
    const response = await saleList.update();
    if (response.success) return res.status(201).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
