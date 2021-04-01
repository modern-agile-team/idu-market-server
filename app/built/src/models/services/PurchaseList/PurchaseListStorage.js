var db = require("../../../config/db");
var PurchaseListStorage = /** @class */ (function () {
    function PurchaseListStorage() {
    }
    //구매목록 화면
    PurchaseListStorage.findAllById = function (id) {
        return new Promise(function (resolve, reject) {
            var sql = " SELECT bo.no AS num, pu.student_id AS buyerId, st.nickname AS buyerName, bo.thumbnail, bo.title, bo.hit, \n      bo.price, cat.name AS categoryName, COUNT(cmt.content) AS commentCount\n      ,date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, bo.student_id AS sellerId,\n      (SELECT nickname FROM students st where bo.student_id = st.id) AS sellerName,\n      (SELECT profile_path FROM students st where bo.student_id = st.id) AS profilePath\n          FROM purchase_lists pu \n          JOIN boards bo\n          ON bo.no = pu.board_no \n          JOIN categories cat\n          ON bo.category_no = cat.no\n          JOIN students st\n          ON st.id = pu.student_id\n          LEFT JOIN comments cmt\n          ON cmt.board_no = bo.no\n          WHERE pu.student_id = ?\n          GROUP BY pu.no\n          ORDER BY pu.no DESC";
            db.query(sql, [id], function (err, purchaseList) {
                if (err)
                    reject(err);
                else
                    resolve(purchaseList);
            });
        });
    };
    PurchaseListStorage.isExist = function (client) {
        return new Promise(function (resolve, reject) {
            var isExist = "SELECT bo.no, pu.student_id FROM purchase_lists pu\n      JOIN boards bo\n      ON bo.no = board_no \n      WHERE pu.board_no=? AND pu.student_id=?";
            var testParams = [client.boardNum, client.studentId];
            db.query(isExist, testParams, function (err, rows) {
                if (err)
                    reject(err);
                if (!rows.length) {
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    };
    PurchaseListStorage.create = function (client) {
        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO purchase_lists(board_no, nickname) VALUES(?, ?)";
            var params = [client.boardNum, client.nickname];
            db.query(sql, params, function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    return PurchaseListStorage;
}());
module.exports = PurchaseListStorage;
