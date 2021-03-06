const express = require("express");
const router = express.Router();

const ctrl = require("./board.ctrl");

router.post("/:codeName", ctrl.process.createByCodeName);

router.get("/:codeName", ctrl.process.findAllByCodeName);
router.get("/:codeName/:num", ctrl.process.detailFindOneByCodeName);

router.put("/:codeName/:num", ctrl.process.updateByNo);

router.delete("/:codeName/:num", ctrl.process.deleteByNo);

module.exports = router;