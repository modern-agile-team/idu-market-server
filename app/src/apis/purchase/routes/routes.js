`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./purchaseList.ctrl");

router.get("/api/purchases/:studentId", ctrl.output.showPurchaseList);

module.exports = router;
