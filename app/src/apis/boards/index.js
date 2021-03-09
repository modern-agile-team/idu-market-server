const express = require("express");
const router = express.Router();

const ctrl = require("./board.ctrl");

router.post("/:categoryName", ctrl.process.createByCategoryName);

router.get("/:categoryName", ctrl.process.findAllByCategoryName);
router.get(
  "/:categoryName/:boardNum",
  ctrl.process.detailFindOneByCategoryName
);

router.put("/:categoryName/:boardNum", ctrl.process.updateByNo);

router.delete("/:categoryName/:boardNum", ctrl.process.deleteByNo);

module.exports = router;
