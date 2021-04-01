var db = require("../../../../config/db");
var CommentStorage = /** @class */ (function () {
    function CommentStorage() {
    }
    CommentStorage.createByBoardNum = function (comment, boardNum) {
        return new Promise(function (resolve, reject) {
            var query = "INSERT INTO comments (student_id, board_no, content, group_no, depth)\n       VALUES (?, ?, ?, 0, 0);";
            db.query(query, [comment.studentId, boardNum, comment.content, comment.depth], function (err, createdInfo) {
                if (err)
                    reject(err);
                resolve({ isCreate: true, num: createdInfo.insertId });
            });
        });
    };
    CommentStorage.createReplyByGroupNum = function (reply, boardNum, groupNum) {
        return new Promise(function (resolve, rejcet) {
            var query = "INSERT INTO comments (student_id, board_no, content, group_no, depth, reply_flag) \n      VALUES (?, ?, ?, ?, 1, 0);";
            db.query(query, [reply.studentId, boardNum, reply.content, groupNum], function (err, replyInfo) {
                if (err)
                    rejcet(err);
                resolve({ isCreate: true, num: replyInfo.insertId });
            });
        });
    };
    CommentStorage.findAllByBoardNum = function (boardNum) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum, \n      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag, \n      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate\n      FROM comments cmt\n      JOIN students AS st\n      ON cmt.student_id = st.id\n      LEFT JOIN boards AS bo\n      ON cmt.board_no = bo.no\n      WHERE cmt.board_no = ?\n      ORDER BY groupNum, inDate;";
            db.query(query, [boardNum], function (err, comment) {
                if (err)
                    reject(err);
                resolve(comment);
            });
        });
    };
    CommentStorage.findOneByNum = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT st.id AS studentId, st.name AS studentName, st.nickname, st.profile_path AS profilePath, cmt.no AS num, cmt.content, cmt.group_no AS groupNum,\n      cmt.depth, cmt.reply_flag AS replyFlag, cmt.hidden_flag AS hiddenFlag,\n      date_format(cmt.in_date, '%Y-%m-%d %H:%i:%s') AS inDate, date_format(cmt.update_date, '%Y-%m-%d %H:%i:%s') AS updateDate\n      FROM comments AS cmt\n      JOIN students AS st\n      ON cmt.student_id = st.id\n      WHERE cmt.no = ?;";
            db.query(query, [num], function (err, comments) {
                if (err)
                    reject(err);
                resolve(comments[0]);
            });
        });
    };
    CommentStorage.findReplyFlag = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT reply_flag AS replyFlag FROM comments WHERE no = ?;";
            db.query(query, [num], function (err, replyFlag) {
                if (err)
                    reject(err);
                else
                    resolve(replyFlag[0].replyFlag);
            });
        });
    };
    CommentStorage.findOneGroupNum = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT group_no AS groupNum FROM comments WHERE no = ?;";
            db.query(query, [num], function (err, comment) {
                if (err)
                    reject(err);
                else
                    resolve(comment[0].groupNum);
            });
        });
    };
    CommentStorage.findOneHiddenFlag = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT hidden_flag AS hiddenFlag FROM comments WHERE no = ?;";
            db.query(query, [num], function (err, comment) {
                if (err)
                    reject(err);
                else
                    resolve(comment[0].hiddenFlag);
            });
        });
    };
    CommentStorage.updateReplyFlagOfCommentByGroupNum = function (commentNum) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE comments SET reply_flag = 1\n      WHERE no = ?;";
            db.query(query, [commentNum], function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    CommentStorage.updateGroupNum = function (commentNum) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE comments SET group_no = ? WHERE no = ?";
            db.query(query, [commentNum, commentNum], function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    CommentStorage.updateByNum = function (comment, num) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE comments SET content = ? WHERE no = ? AND student_id = ?;";
            db.query(query, [comment.content, num, comment.studentId], function (err, updatedInfo) {
                if (err)
                    reject(err);
                else
                    resolve(updatedInfo.affectedRows);
            });
        });
    };
    CommentStorage.updatehiddenFlag = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE comments SET hidden_flag = 1 WHERE no = ?;";
            db.query(query, [num], function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    CommentStorage.updateReplyFlag = function (groupNum) {
        return new Promise(function (resolve, reject) {
            var query = "UPDATE comments SET reply_flag = 0 WHERE no = ? AND\n            (SELECT count(group_no) FROM (SELECT group_no FROM comments AS group_no WHERE group_no = ?) AS count) = 1;";
            db.query(query, [groupNum, groupNum], function (err, rows) {
                if (err)
                    reject(err);
                else
                    resolve(rows.affectedRows);
            });
        });
    };
    CommentStorage.deleteCommentByNum = function (num) {
        return new Promise(function (resolve, rejcet) {
            var query = "DELETE FROM comments WHERE no = ? AND reply_flag = 0 AND depth = 0";
            db.query(query, [num], function (err, row) {
                if (err)
                    rejcet(err);
                else
                    resolve(row.affectedRows);
            });
        });
    };
    CommentStorage.deleteReplyByNum = function (num, studentId) {
        return new Promise(function (resolve, reject) {
            var query = "DELETE FROM comments WHERE no = ? AND depth = 1 AND student_id = ?";
            db.query(query, [num, studentId], function (err, row) {
                if (err)
                    reject(err);
                else
                    resolve(row.affectedRows);
            });
        });
    };
    CommentStorage.deleteHiddenComment = function (num) {
        return new Promise(function (resolve, reject) {
            var query = "DELETE FROM comments WHERE no = ? AND hidden_flag = 1 AND reply_flag = 0;";
            db.query(query, [num], function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    CommentStorage.findStudentIdByNum = function (board) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT DISTINCT nickname \n      FROM comments cm\n      JOIN students st\n      ON st.id = cm.student_id\n      WHERE board_no = ? AND cm.hidden_flag = 0;";
            db.query(sql, board, function (err, buyers) {
                if (err)
                    reject(err);
                else
                    resolve(buyers);
            });
        });
    };
    return CommentStorage;
}());
module.exports = CommentStorage;
