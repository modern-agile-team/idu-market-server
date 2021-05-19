import { Router } from "express";
import ctrl from "./inquiry.ctrl";

const router: Router = Router();

router.post("/", ctrl.sendEmailForInquiry);

export default router;
