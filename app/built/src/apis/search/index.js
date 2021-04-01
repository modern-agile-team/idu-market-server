var express = require("express");
var router = express.Router();
var ctrl = require("./search.ctrl");
router.get("/", ctrl.process.search);
module.exports = router;
