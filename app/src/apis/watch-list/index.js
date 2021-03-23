const express = require("express");
const router = express.Router();
const ctrl = require("./watch-list.ctrl");

router.get("/:studentId", ctrl.output.findAllByStudentId);
router.delete("/:studentId", ctrl.process.delete);
router.post("/:studentId", ctrl.process.update);

module.exports = router;
