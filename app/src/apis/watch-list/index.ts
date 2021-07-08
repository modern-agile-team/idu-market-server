import { Router } from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./watch-list.ctrl";

const router: Router = Router();

router.get("/:studentId", apiAuth, ctrl.findAllByStudentId);
router.post("/:studentId", apiAuth, ctrl.create);
router.delete("/:studentId", apiAuth, ctrl.delete);

export default router;
