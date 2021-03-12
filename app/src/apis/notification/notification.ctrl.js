const Email = require("../../models/services/Email/Email");

const process = {
  notify: async (req, res) => {
    const email = new Email(req);
    const response = await email.sendNotification();
    if (response.success) return res.status(200).json(response);
    return res.status(400).json(response);
  },
};

module.exports = {
  process,
};
