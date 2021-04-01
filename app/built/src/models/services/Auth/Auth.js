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
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var AuthStorage = require("./AuthStorage");
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.createJWT = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    profilePath: user.profile_path,
                    isAdmin: user.admin_flag,
                };
                return [2 /*return*/, jwt.sign(payload, process.env.JWT_SECRET, this.jwtOption)];
            });
        });
    };
    Auth.verifyJWT = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded;
            return __generator(this, function (_a) {
                try {
                    decoded = jwt.verify(token, process.env.JWT_SECRET);
                    return [2 /*return*/, decoded];
                }
                catch (err) {
                    if (err.message === "jwt expired") {
                        console.log("JWT 유효 시간이 만료되었습니다.");
                        return [2 /*return*/, this.TOKEN_EXPIRED];
                    }
                    else if (err.message === "invalid token") {
                        console.log("유효하지 않은 JWT 입니다.");
                        return [2 /*return*/, this.TOKEN_INVALID];
                    }
                    else {
                        console.log("유효하지 않은 JWT 입니다.");
                        return [2 /*return*/, this.TOKEN_INVALID];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    Auth.createToken = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user, isSave, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = crypto.randomBytes(30).toString("hex").slice(0, 30);
                        user = {
                            token: token,
                            id: id,
                        };
                        return [4 /*yield*/, AuthStorage.saveToken(user)];
                    case 1:
                        isSave = _a.sent();
                        if (isSave)
                            return [2 /*return*/, { success: true, token: token }];
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, { success: false, err: err_1 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.useableId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var auth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuthStorage.findOneByStudentId(id)];
                    case 1:
                        auth = _a.sent();
                        if (auth) {
                            return [2 /*return*/, {
                                    useable: true,
                                    msg: "등록된 토큰입니다.",
                                }];
                        }
                        return [2 /*return*/, {
                                useable: false,
                                msg: "미등록된 토큰이거나 유효시간(20분)이 만료되었습니다. 비밀번호 찾기를 다시 시도해주십시오.",
                            }];
                }
            });
        });
    };
    Auth.TOKEN_INVALID = -2;
    Auth.TOKEN_EXPIRED = -3;
    Auth.jwtOption = {
        algorithm: "HS256",
        expiresIn: "1d",
        issuer: "wooahan agile",
    };
    return Auth;
}());
module.exports = Auth;
