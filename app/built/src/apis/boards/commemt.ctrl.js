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
var logger = require("../../config/logger");
var Comment = require("../../models/services/Board/Comment/Comment");
var process = {
    createByBoardNum: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var comment, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment = new Comment(req);
                    return [4 /*yield*/, comment.createByBoardNum(req)];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        logger.info("POST /api/boards/categoryName/num 201 " + response.msg);
                        return [2 /*return*/, res.status(201).json(response)];
                    }
                    logger.error("POST /api/boards/categoryName/num 400 " + response.msg);
                    res.status(400).json(response);
                    return [2 /*return*/];
            }
        });
    }); },
    createReplyByGroupNum: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var comment, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment = new Comment(req);
                    return [4 /*yield*/, comment.createReplyByGroupNum(req)];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        logger.info("POST /api/boards/categoryName/num/groupNum 201 " + response.msg);
                        return [2 /*return*/, res.status(201).json(response)];
                    }
                    if (response.isError) {
                        logger.error("POST /api/boards/categoryName/num/groupNum 400 " + response.errMsg);
                        return [2 /*return*/, res.status(400).json(response.clientMsg)];
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    updateByNum: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var comment, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment = new Comment(req);
                    return [4 /*yield*/, comment.updateByNum()];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        logger.info("PATCH /api/boards/categoryName/num/commentNum 200 " + response.msg);
                        return [2 /*return*/, res.status(200).json(response)];
                    }
                    if (response.isError) {
                        logger.error("PATCH /api/boards/categoryName/num/commentNum 400 " + response.errMsg);
                        return [2 /*return*/, res.status(400).json(response.clientMsg)];
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    deleteByNum: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var comment, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment = new Comment(req);
                    response = {};
                    if (!(req.body.depth === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, comment.deleteCommentByNum()];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, comment.deleteReplyByNum()];
                case 3:
                    response = _a.sent();
                    _a.label = 4;
                case 4:
                    if (response.success) {
                        logger.info("DELETE /api/boards/categoryName/num/commentNum 200 " + response.msg);
                        return [2 /*return*/, res.status(200).json(response)];
                    }
                    if (response.isError) {
                        logger.error("DELETE /api/boards/categoryName/num/commentNum 400 " + response.errMsg);
                        return [2 /*return*/, res.status(400).json(response.clientMsg)];
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    findStudentIdByNum: function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var comment, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment = new Comment(req);
                    return [4 /*yield*/, comment.findStudentIdByNum()];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        logger.info("GET /api/boards/categoryName/num/comments 200 " + response.msg);
                        return [2 /*return*/, res.status(200).json(response)];
                    }
                    if (response.isError) {
                        logger.error("GET /api/boards/categoryName/num.comments 400 " + response.errMsg);
                        return [2 /*return*/, res.status(400).json(response.clientMsg)];
                    }
                    return [2 /*return*/];
            }
        });
    }); },
};
module.exports = {
    process: process,
};
