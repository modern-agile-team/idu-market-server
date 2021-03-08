const User = require("../../models/services/User");
const Email = require("../../models/services/Email");

const process = {
  login: async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.login();
      if (response.success) return res.status(201).json(response);
      return res.status(400).json(response);
    } catch (err) {
      throw err;
    }
  },

  signup: async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.signup();
      if (response.success) return res.status(201).json(response);
      return res.status(409).json(response);
    } catch (err) {
      throw err;
    }
  },

  sendEmailForId: async (req, res) => {
    try {
      const email = new Email(req.body);
      const response = await email.sendId();
      if (response.success) return res.status(200).json(response);
      return res.status(400).json(response);
    } catch (err) {
      throw err;
    }
  },

  sendEmailForPsword: async (req, res) => {
    try {
      const email = new Email(req.body);
      const response = await email.sendLinkForPsword();
      if (response.success) return res.status(200).json(response);
      return res.status(400).json(response);
    } catch (err) {
      throw err;
    }
  },

  resetPsword: async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.resetPassword();
      if (response.success) return res.status(200).json(response);
      return res.status(400).json(response);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = {
  process,
};
