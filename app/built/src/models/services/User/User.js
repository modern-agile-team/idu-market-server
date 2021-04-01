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
var UserStorage = require("./UserStorage");
var Auth = require("../Auth/Auth");
var AuthStorage = require("../Auth/AuthStorage");
var Cryptor = require("../../utils/Cryptor");
var Error = require("../../utils/Error");
var User = /** @class */ (function () {
    function User(req) {
        this.body = req.body;
    }
    User.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, user, _a, jwt, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        client = this.body;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, UserStorage.findOneById(client.id)];
                    case 2:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 6];
                        _a = client;
                        return [4 /*yield*/, Cryptor.encryptBySalt(client.psword, user.salt)];
                    case 3:
                        _a.psword = _b.sent();
                        if (!(user.id === client.id && user.psword === client.psword)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Auth.createJWT(user)];
                    case 4:
                        jwt = _b.sent();
                        return [2 /*return*/, { success: true, msg: "로그인에 성공하셨습니다.", jwt: jwt }];
                    case 5: return [2 /*return*/, { success: false, msg: "잘못된 비밀번호입니다." }];
                    case 6: return [2 /*return*/, { success: false, msg: "존재하지 않는 아이디입니다." }];
                    case 7:
                        err_1 = _b.sent();
                        return [2 /*return*/, Error.ctrl("서버 개발자에게 문의해주십시오", err_1)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.signup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, inspector, _a, hash, salt, isSave, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        client = this.body;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.inspectIdAndEmailAndNickname()];
                    case 2:
                        inspector = _b.sent();
                        if (!inspector.saveable) return [3 /*break*/, 5];
                        return [4 /*yield*/, Cryptor.encrypt(client.psword)];
                    case 3:
                        _a = _b.sent(), hash = _a.hash, salt = _a.salt;
                        client.psword = hash;
                        client.salt = salt;
                        return [4 /*yield*/, UserStorage.save(client)];
                    case 4:
                        isSave = _b.sent();
                        if (isSave)
                            return [2 /*return*/, { success: true, msg: "회원가입이 정상 처리 되었습니다." }];
                        _b.label = 5;
                    case 5: return [2 /*return*/, inspector];
                    case 6:
                        err_2 = _b.sent();
                        return [2 /*return*/, Error.ctrl("서버 개발자에게 문의해주십시오", err_2)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.resetPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, authInfo, isReset, isDeleteToken, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Auth.useableId(client.id)];
                    case 2:
                        authInfo = _a.sent();
                        if (!authInfo.useable)
                            return [2 /*return*/, authInfo];
                        return [4 /*yield*/, UserStorage.resetPassword(client)];
                    case 3:
                        isReset = _a.sent();
                        if (!isReset) return [3 /*break*/, 5];
                        return [4 /*yield*/, AuthStorage.deleteTokenByStudentId(client.id)];
                    case 4:
                        isDeleteToken = _a.sent();
                        if (isDeleteToken) {
                            return [2 /*return*/, { success: true, msg: "비밀번호가 변경되었습니다." }];
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_3 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 개발자에게 문의해주십시오", err_3)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.inspectIdAndEmailAndNickname = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, users, _i, users_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        return [4 /*yield*/, UserStorage.findAllByIdAndEmailAndNickname(client.id, client.email, client.nickname)];
                    case 1:
                        users = _a.sent();
                        if (users.length === 0) {
                            return [2 /*return*/, { saveable: true }];
                        }
                        else {
                            for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                                user = users_1[_i];
                                if (user.id === client.id) {
                                    return [2 /*return*/, { saveable: false, msg: "이미 존재하는 아이디 입니다." }];
                                }
                                else if (user.email === client.email) {
                                    return [2 /*return*/, { saveable: false, msg: "이미 가입된 이메일 입니다." }];
                                }
                                else if (user.nickname === client.nickname)
                                    return [2 /*return*/, { saveable: false, msg: "이미 사용되고 있는 이름 입니다." }];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.isExistNameAndEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        return [4 /*yield*/, UserStorage.findOneByEmail(client.email)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            if (user.name !== client.name)
                                return [2 /*return*/, { isExist: false, msg: "등록되지 않은 이름 입니다." }];
                            else if (user.email !== client.email)
                                return [2 /*return*/, { isExist: false, msg: "등록되지 않은 이메일 입니다." }];
                            else
                                return [2 /*return*/, { isExist: true }];
                        }
                        return [2 /*return*/, { isExist: false, msg: "등록되지 않은 이름 입니다." }];
                }
            });
        });
    };
    User.prototype.isExistIdAndEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        return [4 /*yield*/, UserStorage.findOneByIdAndEmail(client.id, client.email)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            if (user.id !== client.id)
                                return [2 /*return*/, { isExist: false, msg: "등록되지 않은 아이디 입니다." }];
                            else if (user.email !== client.email)
                                return [2 /*return*/, { isExist: false, msg: "등록되지 않은 이메일 입니다." }];
                            else
                                return [2 /*return*/, { isExist: true }];
                        }
                        return [2 /*return*/, { isExist: false, msg: "등록되지 않은 아이디 입니다." }];
                }
            });
        });
    };
    return User;
}());
module.exports = User;
