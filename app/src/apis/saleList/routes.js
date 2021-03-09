`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./saleList.ctrl");

router.get("/", ctrl.output.findSaleList);
router.post("/add", ctrl.process.update);

module.exports = router;
