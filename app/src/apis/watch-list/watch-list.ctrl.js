const logger = require("../../config/logger");
const WatchList = require("../../models/services/WatchList/WatchList");

const process = {
  findAllByStudentId: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.findAllByStudentId();
    if (response.isError) {
      logger.error(`GET /api/sale-list/studentId 409 ${response.errMsg}`);
      return res.status(409).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`GET /api/watchlist/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/sale-list/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },

  update: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.update();
    if (response.isError) {
      logger.error(`POST /api/sale-list/studentId 409 ${response.errMsg}`);
      return res.status(409).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`POST /api/watchlist/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`POST /api/watchlist/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },

  delete: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.delete();
    if (response.isError) {
      logger.error(`DELETE /api/sale-list/studentId 409 ${response.errMsg}`);
      return res.status(409).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`DELETE /api/watchlist/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`DELETE /api/watchlist/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

module.exports = { process };
