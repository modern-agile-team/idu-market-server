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
var _this = this;
var Auth = require("../models/services/Auth/Auth");
// 로그인 된 유저들만 서비스 이용을 허가하는 미들웨어
var logined = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.headers["x-auth-token"];
                // 토큰 없음
                if (!token)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ success: false, msg: "JWT가 존재하지 않습니다." })];
                return [4 /*yield*/, Auth.verifyJWT(token)];
            case 1:
                user = _a.sent();
                // 유효기간 만료
                if (user === Auth.TOKEN_EXPIRED)
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            msg: "JWT의 유효 시간이 만료되었습니다.",
                        })];
                // 유효하지 않는 토큰
                if (user === Auth.TOKEN_INVALID)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ success: false, msg: "유효하지 않은 JWT 입니다." })];
                if (user.id === undefined)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ success: false, msg: "유효하지 않은 JWT 입니다." })];
                req.user = user;
                next();
                return [2 /*return*/];
        }
    });
}); };
// 로그인이 안된 유저들만 서비스 이용을 허가하는 미들웨어
var notLogined = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.headers["x-auth-token"];
                if (!!token) return [3 /*break*/, 1];
                next();
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Auth.verifyJWT(token)];
            case 2:
                user = _a.sent();
                // 유효기간 만료 || 유효하지 않는 토큰 || 없는 아이디
                if (user === Auth.TOKEN_EXPIRED ||
                    user === Auth.TOKEN_INVALID ||
                    user.id === undefined) {
                    next();
                }
                else {
                    // 유효한 토큰이라면 403을 반환하여 로그인 페이지로의 접근을 막는다.
                    res.status(403).json({
                        success: false,
                        msg: "이미 로그인 된 사용자입니다.",
                    });
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = { logined: logined, notLogined: notLogined };
