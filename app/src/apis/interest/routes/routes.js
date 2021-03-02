`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./cart.ctrl");

router.get("/api/interest-products/:studentId", ctrl.output.showCart);
router.delete("/api/interest-products/:studentId/delete", ctrl.process.deleteProduct);
router.post("/api/add-interest-products", ctrl.process.insertProduct);

module.exports = router;
