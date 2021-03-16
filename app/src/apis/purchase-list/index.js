`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./purchase-list.ctrl");

// router.patch("/:studentId/:boardNum", ctrl.process.update);
router.get("/:studentId/:boardNum", ctrl.output.read);
router.post("/", ctrl.process.update);

module.exports = router;
