import { Router } from "express";
import ctrl from "./profile.ctrl";

const router: Router = Router();

router.get("/:studentId", ctrl.findOneById);
router.put("/:studentId", ctrl.update);
router.patch("/:studentId", ctrl.updateImage);

export default router;
