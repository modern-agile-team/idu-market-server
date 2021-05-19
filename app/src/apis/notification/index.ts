import * as express from "express";
import ctrl from "./notification.ctrl";

const router: express.Router = express.Router();

router.post("/", ctrl.process.notify);
router.post("/:boardNum", ctrl.process.create);

export default router;
