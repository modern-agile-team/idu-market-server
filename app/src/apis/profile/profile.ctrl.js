const Profile = require("../../models/services/profile/Profile");

const output = {
  findAllById: async (req, res) => {
    const user = await new Profile(req.body.studentId);
    const response = await user.findAllById();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output };
