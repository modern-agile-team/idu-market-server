"use strict";

const process = {
  login: (req, res) => {
    const user = new User(req);
    const response = user.login();
    return res.json(response);
  },
  signup: () => {},
  sendEmailForId: () => {},
  sendEmailForPsword: () => {},
  resetPsword: () => {},
};

module.exports = {
  process,
};
