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

router.put("/:categoryName/:num", boardCtrl.process.updateByNum);
router.patch("/:categoryName/:num", boardCtrl.process.updateOnlyHit); // 조회수 1 증가 API
router.patch("/:categoryName/:num/:commentNum", commentCtrl.process.updateByNo);

router.delete("/:categoryName/:num", boardCtrl.process.deleteByNum);
router.delete("/:categoryName/:num/:commentNum", commentCtrl.process.delete);

module.exports = router;
