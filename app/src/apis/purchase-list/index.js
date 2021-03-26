`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./purchase-list.ctrl");

router.get("/:studentId", ctrl.process.read);
router.post("/", ctrl.process.create);
module.exports = router;
