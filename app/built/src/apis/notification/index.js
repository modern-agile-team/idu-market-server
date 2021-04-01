var express = require("express");
var router = express.Router();
var ctrl = require("./notification.ctrl");
router.post("/", ctrl.process.notify);
module.exports = router;
