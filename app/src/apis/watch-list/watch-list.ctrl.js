const logger = require("../../config/logger");
const WatchList = require("../../models/services/WatchList/WatchList");

const output = {
  findAllByStudentId: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.findAllByStudentId();
    if (response.success) {
      logger.info(`GET /api/watchlist/studentId 200 ${response.success}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/sale-list/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.update();
    if (response.success) {
      logger.info(`POST /api/watchlist/studentId/add 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`POST /api/watchlist/studentId/add 409 ${response.msg}`);
    return res.status(409).json(response);
  },

  delete: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.delete();
    if (response.success) {
      logger.info(`DELETE /api/watchlist/studentId/delete 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`DELETE /api/watchlist/studentId/delete 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
