"use strict";
var db = require("../../../config/db");
var BoardStroage = /** @class */ (function () {
    function BoardStroage() {
    }
    BoardStroage.create = function (num, board) {
        return new Promise(function (resolve, reject) {
            var query = "INSERT INTO boards (student_id, category_no, title, content, thumbnail, price) VALUES (?, ?, ?, ?, ?, ?);";
            db.query(query, [
                board.studentId,
                num,
                board.title,
                board.content,
                board.thumbnail,
                board.price,
            ], function (err, boards) {
                if (err)
                    reject(err);
                else
                    resolve({ success: true, num: boards.insertId });
            });
        });
    };
    BoardStroage.findAllByCategoryNum = function (categoryNum, lastNum) {
        var where = "";
        var limit = "";
        // 아래 if 문으로 Market API와 Board API를 구분짓게 된다.
        if (lastNum >= 0) {
            // req.query.lastNum (게시판 마지막 번호)가 0이면 반환 게시글 개수를 10개로 제한한다.
            limit = "LIMIT 10";
            if (lastNum > 0) {
                // req.query.lastNum (게시판 마지막 번호) 보다 게시글 번호가 작은 10개를 응답한다.
                where = "AND bo.no < ?";
            }
        }
        return new Promise(function (resolve, reject) {
            var query = "SELECT bo.no AS num, st.id AS studentId, st.nickname AS nickname, st.profile_path AS profilePath, bo.thumbnail, bo.title, bo.hit, bo.price, bo.status,\n      date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate,\n      COUNT(cmt.content) AS commentCount\n      FROM boards AS bo\n      JOIN students AS st\n      ON bo.student_id = st.id\n      LEFT JOIN comments AS cmt\n      ON bo.no = cmt.board_no\n      WHERE bo.category_no = ? " + where + "\n      GROUP BY num\n      ORDER BY num desc\n      " + limit + ";";
            db.query(query, [categoryNum, lastNum], function (err, boards) {
                if (err)
                    reject(err);
                else
                    resolve(boards);
            });
        });
    };
    BoardStroage.findOneByNum = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT bo.no AS num, bo.student_id AS studentId, st.name AS studentName, st.nickname, st.profile_path AS profilePath, bo.title AS title, bo.content, bo.hit AS hit, bo.price AS price, bo.status AS status,\n      bo.category_no AS categoryNum, date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate\n      FROM boards AS bo\n      JOIN students AS st\n      ON bo.student_id = st.id\n      WHERE bo.no = ?";
            db.query(query, [num], function (err, boards) {
                if (err)
                    reject(err);
                else
                    resolve(boards[0]);
            });
        });
    };
    BoardStroage.findOneWatchListFlag = function (studentId, num) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT * FROM boards bo\n      JOIN watch_lists wl\n      ON bo.no = wl.board_no\n      WHERE wl.student_id = ? and bo.no = ?;";
            db.query(query, [studentId, num], function (err, watchList) {
                if (err)
                    reject(err);
                else
                    resolve(watchList.length);
            });
        });
    };
    BoardStroage.updateByNum = function (board, num) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE boards SET title = ?, content = ?, price = ? where no = ?;";
            db.query(query, [board.title, board.content, board.price, num], function (err, boards) {
                if (err)
                    reject(err);
                else
                    resolve({ success: true, num: boards.insertId });
            });
        });
    };
    BoardStroage.updateOnlyHitByNum = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE boards SET hit = hit + 1 WHERE no = ?;";
            db.query(query, [num], function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    BoardStroage.updateOnlyStatusByNum = function (board, num) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE boards SET status = ? WHERE no = ?;";
            db.query(query, [board.status, num], function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    BoardStroage.delete = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "DELETE FROM boards where no = ?";
            db.query(query, [num], function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    BoardStroage.findAllByIncludedTitleAndCategory = function (title, categoryNum) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT bo.no AS num, bo.student_id AS studentId, st.profile_path AS profilePath, st.nickname, bo.thumbnail, bo.title, bo.hit, bo.price, bo.status,\n      date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') AS inDate,\n      COUNT(cmt.content) AS commentCount\n      FROM boards AS bo\n      JOIN students AS st\n      ON bo.student_id = st.id\n      LEFT JOIN comments AS cmt\n      ON bo.no = cmt.board_no\n      WHERE bo.title regexp ? && bo.category_no = ?\n      GROUP BY num\n      ORDER BY num desc;";
            db.query(query, [title, categoryNum], function (err, boards) {
                if (err)
                    reject(err);
                else
                    resolve(boards);
            });
        });
    };
    return BoardStroage;
}());
module.exports = BoardStroage;
