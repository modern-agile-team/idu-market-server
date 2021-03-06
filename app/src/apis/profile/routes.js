"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./profile.ctrl");

router.get("/", ctrl.output.findAllById);
router.post("/update", ctrl.process.update);

module.exports = router;
