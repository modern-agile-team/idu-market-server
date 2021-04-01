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
var s3 = require("../../middlewares/s3");
var logger = require("../../config/logger");
var process = {
    upload: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var images, path;
        return __generator(this, function (_a) {
            images = req.files;
            try {
                path = images.map(function (img) { return img.location; });
                logger.info("POST /api/image 200 \uC5C5\uB85C\uB4DC \uC131\uACF5");
                return [2 /*return*/, res
                        .status(200)
                        .json({ success: true, msg: "업로드 성공되었습니다.", url: path })];
            }
            catch (err) {
                logger.error("POST /api/image 400 \uC5C5\uB85C\uB4DC \uC2E4\uD328 err: " + err);
                return [2 /*return*/, res
                        .status(400)
                        .json({ success: false, msg: "이미지가 없습니다." })];
            }
            return [2 /*return*/];
        });
    }); },
    delete: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var rest, keys_1, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rest = req.body.url;
                    if (!rest.length) return [3 /*break*/, 2];
                    keys_1 = [];
                    rest.forEach(function (img) {
                        var cutUrl = img.split("/");
                        var length = cutUrl.length;
                        var key = cutUrl[length - 2] + "/" + cutUrl[length - 1];
                        keys_1.push(key);
                    });
                    return [4 /*yield*/, s3.deleteImage(keys_1)];
                case 1:
                    response = _a.sent();
                    if (response) {
                        logger.info("POST /api/image/remove 200 \uC0AD\uC81C \uC131\uACF5");
                        return [2 /*return*/, res
                                .status(200)
                                .json({ success: true, msg: "삭제 완료되었습니다." })];
                    }
                    logger.error("POST /api/image/remove 400 s3 \uC811\uADFC \uC624\uB958");
                    return [2 /*return*/, res.status(400).json({ success: false, msg: "s3 접근 오류" })];
                case 2:
                    logger.error("POST /api/image/remove 400 \uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
                    return [2 /*return*/, res.status(400).json({ success: false, msg: "사진이 없습니다." })];
            }
        });
    }); },
};
module.exports = { process: process };
