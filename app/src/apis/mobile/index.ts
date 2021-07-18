import { Router } from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./mobile.ctrl";

const router: Router = Router();

router.get("/main", apiAuth, ctrl.readAll);

export default router;
