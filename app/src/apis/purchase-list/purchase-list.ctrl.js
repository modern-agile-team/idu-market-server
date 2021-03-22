const PurchaseList = require("../../models/services/PurchaseList/PurchaseList");
const logger = require("../../config/logger");

const output = {
  read: async (req, res) => {
    const student = new PurchaseList(req);
    const response = await student.read();
    if (response.success) {
      logger.info(`GET /api/purchase-list/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    response.msg = "알수 없는 응답입니다. 서버 개발자에게 문의해주십시오";
    logger.error(`GET /api/purchase-list/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

const process = {
  create: async (req, res) => {
    const purchaseList = new PurchaseList(req.body);
    const response = await purchaseList.create();
    if (response.success) {
      logger.info(`POST /api/purchase-list 201 ${response.msg}`);
      return res.status(201).json(response);
    }
    logger.error(`POST /api/purchase-list 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
