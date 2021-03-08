const upload = require("../../models/utils/image");
const express = require("express");
const router = express.Router();
const ctrl = require("./image.ctrl");

router.post("/muti", upload.array("image", 10), ctrl.process.uploadImages);
router.post("/single", upload.single("image"), ctrl.process.upload);

module.exports = router;
