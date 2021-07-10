import { Router } from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./purchase-list.ctrl";

const router: Router = Router();

router.get("/:studentId", apiAuth, ctrl.read);
router.post("/", apiAuth, ctrl.create);

export default router;
