`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./watch-list.ctrl");

router.get("/", ctrl.output.findAllById);
router.delete("/delete", ctrl.process.delete);
router.post("/add", ctrl.process.update);

module.exports = router;
