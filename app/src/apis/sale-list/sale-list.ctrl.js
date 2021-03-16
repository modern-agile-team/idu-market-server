const SaleList = require("../../models/services/SaleList/SaleList.js");

const output = {
  read: async (req, res) => {
    const student = new SaleList(req.params.studentId);
    const response = await student.read();
    if (response.success) return res.status(200).json(response);
    response.msg = "알수 없는 응답입니다. 서버 개발자에게 문의해주십시오";
    return res.status(400).json(response);
  },
};

module.exports = output;
