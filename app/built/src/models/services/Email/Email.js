var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var nodemailer = require("nodemailer");
var User = require("../User/User");
var UserStorage = require("../User/UserStorage");
var Auth = require("../Auth/Auth");
var mailOption = require("../../../config/mail");
var error = require("../../utils/Error");
var CHANGE_PSWORD_URL = process.env.CHANGE_PASSWORD_URL;
var Email = /** @class */ (function () {
    function Email(req) {
        this.req = req;
        this.body = req.body;
    }
    Email.prototype.sendId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client_1, users, user_1, promise, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        client_1 = this.body;
                        return [4 /*yield*/, UserStorage.findAllByName(client_1.name)];
                    case 1:
                        users = _a.sent();
                        if (users.length === 0)
                            return [2 /*return*/, { success: false, msg: "등록되지 않은 이름 입니다." }];
                        return [4 /*yield*/, UserStorage.findOneByEmail(client_1.email)];
                    case 2:
                        user_1 = _a.sent();
                        if (!user_1)
                            return [2 /*return*/, { success: false, msg: "등록되지 않은 이메일 입니다." }];
                        promise = new Promise(function (resolve, reject) {
                            try {
                                var message = {
                                    from: process.env.MAIL_EMAIL,
                                    to: client_1.email,
                                    subject: "[idu-market] " + client_1.name + "\uB2D8\uC758 \uC544\uC774\uB514\uAC00 \uB3C4\uCC29\uD588\uC2B5\uB2C8\uB2E4.",
                                    html: "<p><b>" + client_1.name + "</b>\uB2D8\uC758 \uC544\uC774\uB514\uB294 <b>" + user_1.id + "</b> \uC785\uB2C8\uB2E4.</p>",
                                };
                                var transporter = nodemailer.createTransport(mailOption);
                                transporter.sendMail(message);
                                resolve({
                                    success: true,
                                    msg: "입력된 이메일로 ID가 발송되었습니다.",
                                });
                            }
                            catch (err) {
                                reject(err);
                            }
                        });
                        return [2 /*return*/, promise.then(function (res) { return res; })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, error.ctrl("서버 개발자에게 문의해주십시오", err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Email.prototype.sendLinkForPsword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req, client, user, existInfo, userInfo, tokenInfo_1, promise, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = this.req;
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        user = new User(req);
                        return [4 /*yield*/, user.isExistIdAndEmail()];
                    case 2:
                        existInfo = _a.sent();
                        if (!existInfo.isExist)
                            return [2 /*return*/, existInfo];
                        return [4 /*yield*/, UserStorage.findOneById(client.id)];
                    case 3:
                        userInfo = _a.sent();
                        if (!userInfo)
                            return [2 /*return*/, { success: false, msg: "등록되지 않은 아이디 입니다." }];
                        return [4 /*yield*/, Auth.createToken(client.id)];
                    case 4:
                        tokenInfo_1 = _a.sent();
                        if (!tokenInfo_1.success)
                            return [2 /*return*/, tokenInfo_1];
                        promise = new Promise(function (resolve, reject) {
                            try {
                                var message = {
                                    from: process.env.MAIL_EMAIL,
                                    to: client.email,
                                    subject: "[idu-market] " + client.id + "\uB2D8\uAED8 \uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD \uB9C1\uD06C\uAC00 \uB3C4\uCC29\uD588\uC2B5\uB2C8\uB2E4.",
                                    html: "<p>\uC548\uB155\uD558\uC2ED\uB2C8\uAE4C, <b>" + client.id + "</b>\uB2D8. <br> \uBE44\uBC00\uBC88\uD638\uB97C \uBCC0\uACBD\uD558\uC2DC\uB824\uBA74 \uD558\uB2E8 \uB9C1\uD06C\uB97C \uD074\uB9AD\uD574\uC8FC\uC2ED\uC2DC\uC624. <br> <a href=\"" + CHANGE_PSWORD_URL + "/" + tokenInfo_1.token + "\">\uBCC0\uACBD\uD558\uAE30</a></p>",
                                };
                                var transporter = nodemailer.createTransport(mailOption);
                                transporter.sendMail(message);
                                resolve({
                                    success: true,
                                    mag: "이메일로 발송된 URL을 통해 비밀번호를 재설정 할 수 있습니다.",
                                });
                            }
                            catch (err) {
                                reject({ success: false, err: String(err) });
                            }
                        });
                        return [2 /*return*/, promise.then(function (res) { return res; })];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, error.ctrl("서버 개발자에게 문의해주십시오", err_2)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Email.prototype.sendNotification = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client_2, user_2, promise, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        client_2 = this.body;
                        return [4 /*yield*/, UserStorage.findOneById(client_2.studentId)];
                    case 1:
                        user_2 = _a.sent();
                        if (!user_2) {
                            return [2 /*return*/, {
                                    success: false,
                                    msg: "존재하지 않는 아이디입니다. 메일 전송에 실패하셨습니다.",
                                }];
                        }
                        promise = new Promise(function (resolve, reject) {
                            try {
                                var message = {
                                    from: process.env.MAIL_EMAIL,
                                    to: user_2.email,
                                    subject: "[idu-market] " + user_2.name + "\uB2D8\uC5D0\uAC8C \uB313\uAE00\uC774 \uB2EC\uB838\uC2B5\uB2C8\uB2E4.",
                                    html: "<p>[idu-market] <b>" + user_2.name + "</b>\uB2D8\uC5D0\uAC8C \uB313\uAE00\uC774 \uB2EC\uB838\uC2B5\uB2C8\uB2E4.</p>\n              <p>\uB313\uAE00\uC744 \uD655\uC778\uD558\uC2DC\uB824\uBA74 \uC544\uB798 \uB9C1\uD06C\uB85C \uC774\uB3D9\uD558\uC2ED\uC2DC\uC624.</p>\n              <p><a href=" + client_2.url + ">" + client_2.categoryName + "</a></p>",
                                };
                                var transporter = nodemailer.createTransport(mailOption);
                                transporter.sendMail(message);
                                resolve({
                                    success: true,
                                    msg: user_2.id + "\uB2D8\uAED8 \uBA54\uC77C \uC54C\uB9BC\uC774 \uC804\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
                                });
                            }
                            catch (err) {
                                reject(err);
                            }
                        });
                        return [2 /*return*/, promise.then(function (res) { return res; })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, error.ctrl("서버 개발자에게 문의해주십시오", err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Email;
}());
module.exports = Email;
