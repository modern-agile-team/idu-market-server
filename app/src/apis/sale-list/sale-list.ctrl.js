const logger = require("../../config/logger.js");
const SaleList = require("../../models/services/SaleList/SaleList.js");

const output = {
  read: async (req, res) => {
    const student = new SaleList(req.params.studentId);
    const response = await student.read();
    if (response.success) {
      logger.info(`GET /api/sale-list/studentId 200 ${response.success}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/sale-list/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

module.exports = output;
