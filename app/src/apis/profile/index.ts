import { Router } from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./profile.ctrl";

const router: Router = Router();

router.get("/:studentId", apiAuth, ctrl.findOneById);
router.put("/:studentId", apiAuth, ctrl.update);
router.patch("/:studentId", apiAuth, ctrl.updateImage);

export default router;
