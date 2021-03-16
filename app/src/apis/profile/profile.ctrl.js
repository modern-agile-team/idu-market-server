const Profile = require("../../models/services/Profile/Profile");

const output = {
  findOneById: async (req, res) => {
    const student = await new Profile(req.params.studentId);
    const response = await student.findOneById();
    if (response) return res.status(200).json(response);
    return res.status(400).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const student = await new Profile(req.body);
    const response = await student.update();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
