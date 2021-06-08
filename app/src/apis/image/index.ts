import { upload } from "../../middlewares/s3";
import * as express from "express";
import ctrl from "./image.ctrl";

const router: express.Router = express.Router();

router.post("/", upload.array("upload", 5), ctrl.upload);
router.delete("/", ctrl.delete);

export default router;
