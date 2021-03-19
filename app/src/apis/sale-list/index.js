`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./sale-list.ctrl");

router.get("/:studentId", ctrl.read);

module.exports = router;
