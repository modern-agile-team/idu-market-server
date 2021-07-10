import * as express from "express";
import { apiAuth } from "../../middlewares/apiAuth";
import ctrl from "./search.ctrl";

const router: express.Router = express.Router();

router.get("/", apiAuth, ctrl.process.search);

export default router;
