"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./profile.ctrl");

router.get("/:studentId/", ctrl.process.findOneById);
router.post("/:studentId", ctrl.process.update);
router.patch("/:studentId", ctrl.process.updateImage);

module.exports = router;
