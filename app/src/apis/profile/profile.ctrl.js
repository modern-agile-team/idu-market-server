const Profile = require("../../models/services/Profile/Profile");
const logger = require("../../config/logger");

const output = {
  findOneById: async (req, res) => {
    const student = await new Profile(req.params.studentId);
    const response = await student.findOneById();
    if (response) {
      logger.info(`GET /api/students/studentId 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`GET /api/students/studentId 400 ${response.msg}`);
    return res.status(400).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const student = await new Profile(req.body);
    const response = await student.update();
    if (response) {
      logger.info(`POST /api/students/studentId/update 200 ${response.msg}`);
      return res.status(200).json(response);
    }
    logger.error(`POST /api/students/studentId/update 409 ${response.msg}`);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
