"use strict";
var express = require("express");
var router = express.Router();
var ctrl = require("./sale-list.ctrl");
router.get("/:studentId", ctrl.process.read);
module.exports = router;
