"use strict";

const User = require("../../models/services/User");
const Email = require("../../models/services/Email");

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
  sendEmailForId: async (req, res) => {
    const email = new Email(req.body);
    const response = await email.sendId();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
  sendEmailForPsword: async () => {},
  resetPsword: async () => {},
};

module.exports = {
  process,
};
