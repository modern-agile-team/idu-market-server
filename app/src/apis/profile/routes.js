"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./profile.ctrl");

router.get("/", ctrl.output.findAllById);

module.exports = router;
