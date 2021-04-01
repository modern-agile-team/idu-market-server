var s3 = require("../../middlewares/s3");
var express = require("express");
var router = express.Router();
var ctrl = require("./image.ctrl");
router.post("/", s3.upload.array("upload", 5), ctrl.process.upload);
router.delete("/", ctrl.process.delete);
module.exports = router;
