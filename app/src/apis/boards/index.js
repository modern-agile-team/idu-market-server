const express = require("express");
const router = express.Router();

const boardCtrl = require("./board.ctrl");
const commentCtrl = require("./commemt.ctrl");

router.post("/:categoryName", boardCtrl.process.createByCategoryName);
router.post("/:categoryName/:num", commentCtrl.process.createByBoardNum);
router.post(
  "/:categoryName/:num/:groupNum",
  commentCtrl.process.createReplyByGroupNum
);

router.get("/:categoryName", boardCtrl.process.findAllByCategoryNum);
router.get("/:categoryName/:num", boardCtrl.process.findOneByNum);
router.get("/:categoryName/:num/comments", boardCtrl.process.findAllByNum);

router.put("/:categoryName/:num", boardCtrl.process.updateByNo);
router.patch("/:categoryName/:num/:commentNum", commentCtrl.process.updateByNo);
router.patch("/:categoryName/:num", boardCtrl.process.updateOnlyStatus);

router.delete("/:categoryName/:num", boardCtrl.process.deleteByNo);
router.delete("/:categoryName/:num/:commentNum", commentCtrl.process.delete);

module.exports = router;
