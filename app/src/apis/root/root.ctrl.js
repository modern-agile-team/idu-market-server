"use strict";

const User = require("../../models/services/User");

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
  },
  signup: async () => {},
  sendEmailForId: async () => {},
  sendEmailForPsword: async () => {},
  resetPsword: async () => {},
};

module.exports = {
  process,
};
