import { Router } from "express";
import ctrl from "./watch-list.ctrl";

const router: Router = Router();

router.get("/:studentId", ctrl.findAllByStudentId);
router.post("/:studentId", ctrl.create);
router.delete("/:studentId", ctrl.delete);

export default router;
