import { Router } from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./sale-list.ctrl";

const router: Router = Router();

router.get("/:studentId", apiAuth, ctrl.read);

export default router;
