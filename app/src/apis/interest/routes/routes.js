`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./cart.ctrl");

router.get("/api/interest_products/:studentId", ctrl.output.showCart);
router.get("/api/add_interest_products", ctrl.output.insertProduct);
router.delete("/api/interest_products/:studentId/delete", ctrl.process.deleteProduct);
router.post("/api/add_interest_products", ctrl.process.insertProduct);

module.exports = router;
