"use strict";
var db = require("../../../config/db");
var SaleListStorage = /** @class */ (function () {
    function SaleListStorage() {
    }
    //판매목록 화면
    SaleListStorage.findAllByStatus = function (id) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT bo.no AS num, bo.student_id AS sellerId, st.nickname AS sellerName, st.profile_path AS profilePath, \n      bo.thumbnail, bo.title, bo.hit, \n      bo.price, cat.name AS categoryName, COUNT(cmt.content) AS commentCount\n      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate\n      FROM boards bo\n      JOIN categories cat\n      ON cat.no = bo.category_no\n      JOIN students st\n      ON st.id = bo.student_id\n      LEFT JOIN comments cmt\n      ON cmt.board_no = bo.no\n      WHERE status = 2 AND bo.student_id = ?\n      GROUP BY bo.no\n      ORDER BY bo.no desc";
            db.query(sql, [id], function (err, saleLists) {
                if (err)
                    reject(err);
                else
                    resolve(saleLists);
            });
        });
    };
    return SaleListStorage;
}());
module.exports = SaleListStorage;
