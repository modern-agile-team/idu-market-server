import * as express from "express";
import ctrl from "./search.ctrl";

const router: express.Router = express.Router();

router.get("/", ctrl.process.search);

export default router;
