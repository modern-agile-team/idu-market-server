const Email = require("../../models/services/Email/Email");
const logger = require("../../config/logger");

const process = {
  notify: async (req, res) => {
    const email = new Email(req);
    const response = await email.sendNotification();
    if (response) {
      logger.info(`POST /api/notification 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`POST /api/notification 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

module.exports = {
  process,
};
