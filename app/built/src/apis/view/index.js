var express = require("express");
var router = express.Router();
router.get("/reset/password/:token", function (req, res) {
    res.render("reset-password");
});
module.exports = router;
