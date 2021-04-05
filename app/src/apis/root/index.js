const express = require("express");
const router = express.Router();

const { logined, notLogined } = require("../../middlewares/auth");
const ctrl = require("./root.ctrl");

router.get("/auth", logined, ctrl.auth.resAuthorizedUserInfo); // 로그인된 사용자일 경우에만 허가하여 회원 정보를 응답하는 API
router.get("/un-auth", notLogined, ctrl.auth.resUnAuthorizedInfo); // 로그인 안된 사용자일 경우에만 허가하는 API

router.post("/jwt", ctrl.process.login);
router.post("/student", ctrl.process.signup);

router.post("/forgot-id", ctrl.process.sendEmailForId);
router.post("/forgot-password", ctrl.process.sendEmailForPsword);
router.patch("/password", ctrl.process.resetPsword);

module.exports = router;
