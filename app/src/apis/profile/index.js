"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./profile.ctrl");

router.get("/:studentId/", ctrl.output.findOneById);
router.post("/:studentId/update", ctrl.process.update);

module.exports = router;
