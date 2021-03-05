"use strict";

const express = require("express");
const router = express.Router();

const { logined, notLogined } = require("../../middlewares/auth");
const ctrl = require("./root.ctrl");

router.post("/jwt", notLogined, ctrl.process.login);
router.post("/user", notLogined, ctrl.process.signup);

router.post("/forgot-id", notLogined, ctrl.process.sendEmailForId);
router.post("/forgot-password", notLogined, ctrl.process.sendEmailForPsword);
router.patch("/password", notLogined, ctrl.process.resetPsword);

module.exports = router;
