const upload = require("../../middlewares/upload");
const express = require("express");
const router = express.Router();
const ctrl = require("./image.ctrl");

router.post("/", upload.array("image", 5), ctrl.process.upload);
module.exports = router;
