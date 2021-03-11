const express = require("express");
const router = express.Router();

const ctrl = require("./board.ctrl");

router.post("/:categoryName", ctrl.process.createByCategoryName);

router.get("/:categoryName", ctrl.process.findAllByCategoryName);
router.get("/:categoryName/:num", ctrl.process.detailFindOneByCategoryName);

router.put("/:categoryName/:num", ctrl.process.updateByNo);

router.delete("/:categoryName/:num", ctrl.process.deleteByNo);

module.exports = router;
