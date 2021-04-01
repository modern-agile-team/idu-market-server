var db = require("../../../config/db");
var WatchListStorage = /** @class */ (function () {
    function WatchListStorage() {
    }
    //장바구니 화면
    WatchListStorage.findAllByStudentId = function (studentId) {
        return new Promise(function (resolve, reject) {
            var sql = " SELECT bo.no AS num, wl.student_id AS studentId, bo.thumbnail, bo.title, bo.hit, bo.price,\n      bo.student_id AS sellerId, st.nickname AS sellerName, wl.category_name AS categoryName, st.profile_path AS profilePath,\n      COUNT(cmt.content) AS commentCount, date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate\n      FROM watch_lists wl\n      JOIN boards bo\n      ON bo.no = wl.board_no \n      LEFT JOIN comments cmt\n      ON wl.board_no = cmt.board_no\n      JOIN students st\n      ON st.id = bo.student_id\n      WHERE wl.student_id = ?\n      GROUP BY wl.no\n      ORDER BY wl.no DESC";
            db.query(sql, [studentId], function (err, boards) {
                if (err)
                    reject(err);
                resolve(boards);
            });
        });
    };
    //장바구니 담는 코드
    WatchListStorage.isExist = function (studentId, watchlist) {
        return new Promise(function (resolve, reject) {
            var isexist = "SELECT board_no, student_id FROM watch_lists WHERE board_no=? AND student_id=?";
            var testParams = [watchlist.boardNum, studentId];
            db.query(isexist, testParams, function (err, boards) {
                if (err)
                    reject(err);
                if (!boards.length) {
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    };
    //장바구니에 담는 코드
    WatchListStorage.update = function (studentId, board) {
        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO watch_lists(board_no, category_name, student_id) VALUES(?, ?, ?)";
            var params = [board.boardNum, board.categoryName, studentId];
            db.query(sql, params, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    //장바구니 있는 물건 삭제
    WatchListStorage.delete = function (studentId, product) {
        return new Promise(function (resolve, reject) {
            var sql = "DELETE FROM watch_lists WHERE board_no = ? AND student_id = ?";
            var params = [product, studentId];
            db.query(sql, params, function (err, result) {
                if (err)
                    reject(err);
                if (result.affectedRows)
                    resolve(true);
                resolve(false);
            });
        });
    };
    return WatchListStorage;
}());
module.exports = WatchListStorage;
