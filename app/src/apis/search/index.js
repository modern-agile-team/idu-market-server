const express = require("express");
const asyncify = require("express-asyncify");

const router = asyncify(express.Router());

const ctrl = require("./search.ctrl");

router.get("/", ctrl.process.search);

module.exports = router;
