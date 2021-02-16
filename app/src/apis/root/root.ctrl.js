"use strict";

const User = require("../../models/services/User");

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.success) return res.status(201).json(response);
    return res.status(409).json(response);
  },
  signup: async (req, res) => {
    const user = new User(req.body);
    const response = await user.signup();
    if (response.success) return res.status(201).json(response);
    return res.status(409).json(response);
  },
  sendEmailForId: async () => {},
  sendEmailForPsword: async () => {},
  resetPsword: async () => {},
};

module.exports = {
  process,
};
