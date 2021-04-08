import * as express from "express";
import ctrl from "./root.ctrl";

const router: express.Router = express.Router();

import { logined, notLogined } from "../../middlewares/auth";

router.get("/auth", logined, ctrl.auth.resAuthorizedStudentInfo); // 로그인된 사용자일 경우에만 허가하여 회원 정보를 응답하는 API
router.get("/un-auth", notLogined, ctrl.auth.resUnAuthorizedInfo); // 로그인 안된 사용자일 경우에만 허가하는 API

router.post("/jwt", ctrl.process.login);
router.post("/student", ctrl.process.signup);

router.post("/forgot-id", ctrl.process.sendEmailForId);
router.post("/forgot-password", ctrl.process.sendEmailForPsword);
router.patch("/password", ctrl.process.resetPsword);

export default router;
