import * as express from "express";
import { apiAuth } from "../../middlewares/apiAuth";

import * as boardCtrl from "./board.ctrl";
import * as commentCtrl from "./commemt.ctrl";

const router: express.Router = express.Router();

router.post("/:categoryName", apiAuth, boardCtrl.process.createByCategoryName);
router.post(
  "/:categoryName/:num",
  apiAuth,
  commentCtrl.process.createByBoardNum
);
router.post(
  "/:categoryName/:num/:groupNum",
  commentCtrl.process.createReplyByGroupNum
);

router.get("/:categoryName", apiAuth, boardCtrl.process.findAllByCategoryNum);
router.get(
  "/:categoryName/:num/comments",
  apiAuth,
  commentCtrl.process.findStudentIdByNum
);
router.get(
  "/:categoryName/:num/:studentId",
  apiAuth,
  boardCtrl.process.findOneByNum
);

router.put("/:categoryName/:num", apiAuth, boardCtrl.process.updateByNum);
router.patch("/:categoryName/:num", apiAuth, boardCtrl.process.updateOnlyHit); // 조회수 1 증가 API
router.patch(
  "/:categoryName/:num/status",
  apiAuth,
  boardCtrl.process.updateOnlyStatus
); // 상태 플래그(판매중, 예약중, 거래완료 등)만 UPDATE
router.patch(
  "/:categoryName/:num/:commentNum",
  apiAuth,
  commentCtrl.process.updateByNum
);

router.delete("/:categoryName/:num", apiAuth, boardCtrl.process.deleteByNum);
router.delete(
  "/:categoryName/:num/:commentNum",
  apiAuth,
  commentCtrl.process.deleteByNum
);

export default router;
