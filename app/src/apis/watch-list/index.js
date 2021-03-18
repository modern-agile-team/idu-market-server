const express = require("express");
const router = express.Router();
const ctrl = require("./watch-list.ctrl");

router.get("/:studentId", ctrl.output.findAllByStudentId);
router.delete("/:studentId/delete", ctrl.process.delete);
router.post("/:studentId/add", ctrl.process.update);

module.exports = router;
