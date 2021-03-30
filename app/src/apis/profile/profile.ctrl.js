const Profile = require("../../models/services/Profile/Profile");
const logger = require("../../config/logger");

const process = {
  findOneById: async (req, res) => {
    const profile = await new Profile(req);
    const response = await profile.findOneById();
    if (response.isError) {
      logger.error(`GET /api/students/studentId 400 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`GET /api/students/studentId 200 ${response}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/students/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },

  update: async (req, res) => {
    const profile = await new Profile(req);
    const response = await profile.update();
    if (response.isError) {
      logger.error(`PUT /api/students/studentId 409 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`PUT /api/students/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`PUT /api/students/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },

  updateImage: async (req, res) => {
    const profile = await new Profile(req);
    const response = await profile.updateImage();
    if (response.isError) {
      logger.error(`PATCH /api/students/studentId 409 ${response.errMsg}`);
      return res.status(400).json(response.clientMsg);
    }
    if (response.success) {
      logger.info(`PATCH /api/students/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`PATCH /api/students/studentId 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

module.exports = { process };
