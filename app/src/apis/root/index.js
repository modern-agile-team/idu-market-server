"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./root.ctrl");

router.post("/jwt", ctrl.process.login);
router.post("/user", ctrl.process.signup);

router.post("/forgot-id", ctrl.process.sendEmailForId);
router.post("/forgot-password", ctrl.process.sendEmailForPsword);
router.patch("/password", ctrl.process.resetPsword);

module.exports = router;
