import { Router } from "express";
import ctrl from "./watch-list.ctrl";

const router: Router = Router();

router.get("/:studentId", ctrl.findAllByStudentId);
router.delete("/:studentId", ctrl.delete);
router.post("/:studentId", ctrl.update);

export default router;
