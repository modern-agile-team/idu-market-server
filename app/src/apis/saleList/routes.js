`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./saleList.ctrl");

router.get("/", ctrl.output.findSaleList);

module.exports = router;
