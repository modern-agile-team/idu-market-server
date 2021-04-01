var express = require("express");
var router = express.Router();
var _a = require("../../middlewares/auth"), logined = _a.logined, notLogined = _a.notLogined;
var ctrl = require("./root.ctrl");
router.get("/auth", logined, ctrl.auth.resAuthorizedUserInfo); // 로그인된 사용자일 경우에만 허가하여 회원 정보를 응답하는 API
router.get("/un-auth", notLogined, ctrl.auth.resUnAuthorizedInfo); // 로그인 안된 사용자일 경우에만 허가하는 API
router.post("/jwt", ctrl.process.login);
router.post("/user", ctrl.process.signup);
router.post("/forgot-id", ctrl.process.sendEmailForId);
router.post("/forgot-password", ctrl.process.sendEmailForPsword);
router.patch("/password", ctrl.process.resetPsword);
module.exports = router;
