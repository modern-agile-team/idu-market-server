import * as express from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./notification.ctrl";

const router: express.Router = express.Router();

router.get("/:studentId", apiAuth, ctrl.process.find);
router.patch("/:studentId", apiAuth, ctrl.process.update);

export default router;
