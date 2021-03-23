const express = require("express");
const asyncify = require("express-asyncify");

const router = asyncify(express.Router());

const ctrl = require("./notification.ctrl");

router.post("/", ctrl.process.notify);

module.exports = router;
