"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./profile.ctrl");

router.get("/:studentId/", ctrl.output.findOneById);
router.post("/:studentId/update", ctrl.process.update);
router.patch("/:studentId/update", ctrl.process.updateByImage);

module.exports = router;
