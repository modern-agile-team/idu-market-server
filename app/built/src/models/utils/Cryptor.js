var bcrypt = require("bcrypt");
var Cryptor = /** @class */ (function () {
    function Cryptor() {
    }
    Cryptor.encrypt = function (psword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(_this.saltRounds, function (err, salt) {
                if (err)
                    reject(err);
                else {
                    bcrypt.hash(psword, salt, function (err, hash) {
                        if (err)
                            reject(err);
                        else
                            resolve({ hash: hash, salt: salt });
                    });
                }
            });
        });
    };
    Cryptor.encryptBySalt = function (psword, salt) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(psword, salt, function (err, hash) {
                if (err)
                    reject(err);
                else
                    resolve(hash);
            });
        });
    };
    Cryptor.saltRounds = 10;
    return Cryptor;
}());
module.exports = Cryptor;
