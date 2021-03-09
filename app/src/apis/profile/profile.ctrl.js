const Profile = require("../../models/services/profile/Profile");

const output = {
  findAllById: async (req, res) => {
    const user = await new Profile(req.body);
    const response = await user.findAllById();
    if (response) return res.status(200).json(response);
    return res.status(400).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const user = await new Profile(req.body);
    const response = await user.update();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
