const s3 = require("../../middlewares/s3");
const express = require("express");
const router = express.Router();
const ctrl = require("./image.ctrl");

router.post("/", s3.upload.array("upload", 5), ctrl.process.upload);
router.post("/delete", ctrl.process.delete);
module.exports = router;
