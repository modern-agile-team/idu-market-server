`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./watchList.ctrl");

router.get("/:studentId", ctrl.output.showWatchList);
router.delete("/:studentId/delete", ctrl.process.deleteProduct);
router.post("/add", ctrl.process.insertProduct);

module.exports = router;
