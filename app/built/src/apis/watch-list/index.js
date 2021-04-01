var express = require("express");
var router = express.Router();
var ctrl = require("./watch-list.ctrl");
router.get("/:studentId", ctrl.process.findAllByStudentId);
router.delete("/:studentId", ctrl.process.delete);
router.post("/:studentId", ctrl.process.update);
module.exports = router;
