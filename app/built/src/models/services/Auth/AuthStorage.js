var db = require("redis");
var redis = db.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
redis.on("error", function (error) {
    console.error(error);
});
var AuthStorage = /** @class */ (function () {
    function AuthStorage() {
    }
    AuthStorage.findOneByStudentId = function (id) {
        return new Promise(function (resolve, reject) {
            redis.get(id + ":token", function (err, token) {
                if (err)
                    reject(err);
                else
                    resolve(token);
            });
        });
    };
    AuthStorage.saveToken = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            redis.set(user.id + ":token", "" + user.token, "EX", _this.expireTime, function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    AuthStorage.deleteTokenByStudentId = function (id) {
        return new Promise(function (resolve, reject) {
            redis.del(id + ":token", function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    };
    AuthStorage.expireTime = 60 * 60 * 24;
    return AuthStorage;
}());
module.exports = AuthStorage;
