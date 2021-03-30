const express = require("express");
const router = express.Router();

const ctrl = require("./notification.ctrl");

router.post("/", ctrl.process.notify);

module.exports = router;
