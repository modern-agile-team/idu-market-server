import * as express from "express";
import ctrl from "./notification.ctrl";

const router: express.Router = express.Router();

router.post("/", ctrl.process.notify);

export default router;