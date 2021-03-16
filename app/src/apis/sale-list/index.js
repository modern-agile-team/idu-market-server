`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./sale-list.ctrl");

router.get("/", ctrl.read);

module.exports = router;
