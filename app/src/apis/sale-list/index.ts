import { Router } from "express";
import ctrl from "./sale-list.ctrl";

const router: Router = Router();

router.get("/:studentId", ctrl.read);

export default router;
