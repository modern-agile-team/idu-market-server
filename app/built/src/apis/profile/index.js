"use strict";
var express = require("express");
var router = express.Router();
var ctrl = require("./profile.ctrl");
router.get("/:studentId", ctrl.process.findOneById);
router.put("/:studentId", ctrl.process.update);
router.patch("/:studentId", ctrl.process.updateImage);
module.exports = router;
