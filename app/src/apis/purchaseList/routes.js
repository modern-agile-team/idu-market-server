`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./purchaseList.ctrl");

router.get("/", ctrl.output.findPurchaseList);
router.post("/add", ctrl.process.update);

module.exports = router;
