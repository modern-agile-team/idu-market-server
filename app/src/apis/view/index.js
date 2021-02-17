"use strict";

const express = require("express");
const router = express.Router();

router.get("/reset/password/:token", (req, res) => {
  res.render("reset-password");
});

module.exports = router;
