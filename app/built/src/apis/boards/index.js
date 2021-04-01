var express = require("express");
var router = express.Router();
var boardCtrl = require("./board.ctrl");
var commentCtrl = require("./commemt.ctrl");
router.post("/:categoryName", boardCtrl.process.createByCategoryName);
router.post("/:categoryName/:num", commentCtrl.process.createByBoardNum);
router.post("/:categoryName/:num/:groupNum", commentCtrl.process.createReplyByGroupNum);
router.get("/:categoryName", boardCtrl.process.findAllByCategoryNum);
router.get("/:categoryName/:num/comments", commentCtrl.process.findStudentIdByNum);
router.get("/:categoryName/:num/:studentId", boardCtrl.process.findOneByNum);
router.put("/:categoryName/:num", boardCtrl.process.updateByNum);
router.patch("/:categoryName/:num", boardCtrl.process.updateOnlyHit); // 조회수 1 증가 API
router.patch("/:categoryName/:num/status", boardCtrl.process.updateOnlyStatus); // 상태 플래그(판매중, 예약중, 거래완료 등)만 UPDATE
router.patch("/:categoryName/:num/:commentNum", commentCtrl.process.updateByNum);
router.delete("/:categoryName/:num", boardCtrl.process.deleteByNum);
router.delete("/:categoryName/:num/:commentNum", commentCtrl.process.deleteByNum);
module.exports = router;
