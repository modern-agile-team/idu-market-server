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
var ProfileStorage = require("./ProfileStorage");
var UserStorage = require("../User/UserStorage");
var Auth = require("../Auth/Auth");
var Error = require("../../utils/Error");
var Profile = /** @class */ (function () {
    function Profile(req) {
        this.params = req.params;
        this.body = req.body;
    }
    Profile.prototype.findOneById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var studentId, profile_1, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        studentId = this.params.studentId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ProfileStorage.findOneById(studentId)];
                    case 2:
                        profile_1 = _a.sent();
                        if (profile_1) {
                            response = profile_1;
                            return [2 /*return*/, { success: true, profile: response }];
                        }
                        return [2 /*return*/, { sucess: false, msg: "존재하지 않는 아이디입니다." }];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 개발자에게 문의해주십시오", err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Profile.prototype.inspectEmailAndNickName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, users, _i, users_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        return [4 /*yield*/, ProfileStorage.findAllByEmailAndNickname(client.email, client.nickname)];
                    case 1:
                        users = _a.sent();
                        if (users.length === 0) {
                            return [2 /*return*/, { saveable: true }];
                        }
                        else {
                            for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                                user = users_1[_i];
                                if (user.email === client.email) {
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
    Profile.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, studentId, inspector, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.body;
                        studentId = this.params.studentId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.inspectEmailAndNickName()];
                    case 2:
                        inspector = _a.sent();
                        if (!inspector.saveable) return [3 /*break*/, 4];
                        return [4 /*yield*/, ProfileStorage.update(user, studentId)];
                    case 3:
                        response = _a.sent();
                        if (response)
                            return [2 /*return*/, {
                                    success: true,
                                    email: user.email,
                                    nickname: user.nickname,
                                    majorNum: user.majorNum,
                                    msg: "정상적으로 수정되었습니다.",
                                }];
                        _a.label = 4;
                    case 4: return [2 /*return*/, inspector];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 개발자에게 문의해주십시오", err_2)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Profile.prototype.updateImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var image, studentId, response, user, jwt, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = this.body.profilePath;
                        studentId = this.params.studentId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, ProfileStorage.updateImage(image, studentId)];
                    case 2:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 5];
                        return [4 /*yield*/, UserStorage.findOneById(studentId)];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, Auth.createJWT(user)];
                    case 4:
                        jwt = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                msg: "정상적으로 이미지가 수정되었습니다.",
                                profilePath: image,
                                jwt: jwt,
                            }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_3 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 개발자에게 문의해주십시오", err_3)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Profile;
}());
module.exports = Profile;
