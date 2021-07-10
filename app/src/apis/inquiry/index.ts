import { Router } from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./inquiry.ctrl";

const router: Router = Router();

router.post("/", apiAuth, ctrl.sendEmailForInquiry);

export default router;
