import * as express from "express";
import ctrl from "./root.ctrl";

const router: express.Router = express.Router();

import { logined, notLogined } from "../../middlewares/auth";
import { apiAuth } from "../../middlewares/apiAuth";

router.get("/auth", logined, apiAuth, ctrl.auth.resAuthorizedStudentInfo); // 로그인된 사용자일 경우에만 허가하여 회원 정보를 응답하는 API
router.get("/un-auth", notLogined, apiAuth, ctrl.auth.resUnAuthorizedInfo); // 로그인 안된 사용자일 경우에만 허가하는 API

router.post("/jwt", apiAuth, ctrl.process.login);
router.post("/student", apiAuth, ctrl.process.signup);

router.post("/forgot-id", apiAuth, ctrl.process.sendEmailForId);
router.post("/forgot-password", apiAuth, ctrl.process.sendEmailForPsword);
router.patch("/password", apiAuth, ctrl.process.resetPsword);

export default router;
