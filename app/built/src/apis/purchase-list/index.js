"use strict";
var express = require("express");
var router = express.Router();
var ctrl = require("./purchase-list.ctrl");
router.get("/:studentId", ctrl.process.read);
router.post("/", ctrl.process.create);
module.exports = router;
