var db = require("../../../config/db");
var ProfileStorage = /** @class */ (function () {
    function ProfileStorage() {
    }
    ProfileStorage.findOneById = function (id) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT st.id, st.name, st.nickname, st.email, \n      st.profile_path AS profilePath, majors.name AS major\n      FROM students st\n      JOIN majors\n      ON st.major_no = majors.no\n      where st.id= ?;";
            db.query(sql, [id], function (err, profile) {
                if (err)
                    reject(err);
                resolve(profile[0]);
            });
        });
    };
    ProfileStorage.updateImage = function (image, studentId) {
        return new Promise(function (resolve, reject) {
            var sql = "UPDATE students st SET st.profile_path = ? WHERE st.id = ?";
            db.query(sql, [image, studentId], function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    // static findtitleById(id) {
    //   return new Promise((resolve, reject) => {
    //     const sql = `SELECT bo.title
    //     FROM boards bo
    //     WHERE bo.student_id = ?`;
    //     db.query(sql, [id], (err, title) => {
    //       if (err) reject(err);
    //       resolve(title);
    //     });
    //   });
    // }
    // static findOneByStudentId(id) {
    //   return new Promise((resolve, reject) => {
    //     const sql = `SELECT bo.title, comments.content
    //     FROM comments
    //     JOIN boards bo
    //     ON bo.no = comments.board_no
    //     WHERE comments.student_id = ?`;
    //     db.query(sql, [id], (err, comments) => {
    //       if (err) reject(err);
    //       resolve(comments);
    //     });
    //   });
    // }
    ProfileStorage.update = function (body, studentId) {
        return new Promise(function (resolve, reject) {
            var sql = "UPDATE students st\n      SET st.email = ?, st.nickname = ?, st.major_no = ?\n      WHERE st.id = ?;";
            db.query(sql, [body.email, body.nickname, body.majorNum, studentId], function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    ProfileStorage.findAllByEmailAndNickname = function (email, nickname) {
        return new Promise(function (resolve, reject) {
            var query = "SELECT * FROM students WHERE email=? OR nickname=?;";
            db.query(query, [email, nickname], function (err, users) {
                if (err)
                    reject(err);
                else
                    resolve(users);
            });
        });
    };
    return ProfileStorage;
}());
module.exports = ProfileStorage;
