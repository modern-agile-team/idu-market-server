import { Router } from "express";
import ctrl from "./purchase-list.ctrl";

const router: Router = Router();

router.get("/:studentId", ctrl.read);
router.post("/", ctrl.create);

export default router;
