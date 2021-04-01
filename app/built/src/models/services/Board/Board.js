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
var BoardStorage = require("./BoardStorage");
var Category = require("../Category/Category");
var String = require("../../utils/String");
var CommentStorage = require("./Comment/CommentStorage");
var BoardStroage = require("./BoardStorage");
var Error = require("../../utils/Error");
var Board = /** @class */ (function () {
    function Board(req) {
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }
    Board.prototype.createByCategoryName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var board, categoryName, categoryNum, _a, success, num, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        board = this.body;
                        categoryName = this.params.categoryName;
                        categoryNum = Category[categoryName];
                        if (categoryNum === undefined)
                            return [2 /*return*/, { success: false, msg: "요청하신 경로가 잘못되었습니다." }];
                        if (!board.thumbnail) {
                            board.thumbnail = process.env.DEFAULT_THUMBNAIL;
                        }
                        if (!board.price) {
                            board.price = "0";
                        }
                        if (board.price < 0 || board.price.toString().length >= 8) {
                            return [2 /*return*/, {
                                    success: false,
                                    msg: "가격은 0 ~ 9999999 까지만 입력 가능합니다.",
                                }];
                        }
                        board.price = String.makePrice(board.price);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BoardStorage.create(categoryNum, board)];
                    case 2:
                        _a = _b.sent(), success = _a.success, num = _a.num;
                        if (success) {
                            return [2 /*return*/, { success: true, msg: "게시판 생성에 성공하셨습니다.", num: num }];
                        }
                        return [2 /*return*/, {
                                success: false,
                                msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주세요",
                            }];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.findAllByCategoryNum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categoryName, categoryNum, lastNum, boards_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryName = this.params.categoryName;
                        categoryNum = Category[categoryName];
                        lastNum = this.query.lastNum;
                        if (categoryNum === undefined) {
                            return [2 /*return*/, { success: false, msg: "존재하지 않는 게시판입니다." }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BoardStorage.findAllByCategoryNum(categoryNum, lastNum)];
                    case 2:
                        boards_1 = _a.sent();
                        if (boards_1) {
                            return [2 /*return*/, { success: true, msg: "게시판 조회 성공", boards: boards_1 }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.findOneByNum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var num, categoryName, categoryNum, studentId, board, comments, watchListFlag, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        num = this.params.num;
                        categoryName = this.params.categoryName;
                        categoryNum = Category[categoryName];
                        studentId = this.params.studentId;
                        if (categoryNum === undefined)
                            return [2 /*return*/, { success: false, msg: "존재하지 않는 게시판입니다." }];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, BoardStorage.findOneByNum(num)];
                    case 2:
                        board = _a.sent();
                        return [4 /*yield*/, CommentStorage.findAllByBoardNum(num)];
                    case 3:
                        comments = _a.sent();
                        return [4 /*yield*/, BoardStorage.findOneWatchListFlag(studentId, num)];
                    case 4:
                        watchListFlag = _a.sent();
                        if (categoryNum === board.categoryNum) {
                            return [2 /*return*/, {
                                    success: true,
                                    msg: "게시판 상세 조회 성공",
                                    board: board,
                                    comments: comments,
                                    watchListFlag: watchListFlag,
                                }];
                        }
                        return [2 /*return*/, { success: false, msg: "게시판 상세 조회 실패" }];
                    case 5:
                        err_3 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_3)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.updateByNum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var num, body, board, _a, success, boardNum, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        num = this.params.num;
                        body = this.body;
                        if (body.price < 0 || body.price.toString().length >= 8) {
                            return [2 /*return*/, {
                                    success: false,
                                    msg: "가격은 0 ~ 9999999 까지만 입력 가능합니다.",
                                }];
                        }
                        body.price = String.makePrice(body.price);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, BoardStorage.findOneByNum(num)];
                    case 2:
                        board = _b.sent();
                        if (!board)
                            return [2 /*return*/, { success: false, msg: "존재하지 않는 게시판입니다." }];
                        return [4 /*yield*/, BoardStorage.updateByNum(body, num)];
                    case 3:
                        _a = _b.sent(), success = _a.success, boardNum = _a.boardNum;
                        if (success) {
                            return [2 /*return*/, {
                                    success: true,
                                    msg: "게시판 수정에 성공하셨습니다.",
                                    num: boardNum,
                                }];
                        }
                        return [2 /*return*/, {
                                success: false,
                                msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
                            }];
                    case 4:
                        err_4 = _b.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_4)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.updateOnlyHit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categoryNum, num, board, isUpdate, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryNum = Category[this.params.categoryName];
                        num = this.params.num;
                        if (!categoryNum)
                            return [2 /*return*/, { success: false, msg: "존재하지 않는 게시판입니다." }];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, BoardStorage.findOneByNum(num)];
                    case 2:
                        board = _a.sent();
                        if (!board)
                            return [2 /*return*/, { success: false, msg: "존재하지 않는 게시판입니다." }];
                        return [4 /*yield*/, BoardStorage.updateOnlyHitByNum(num)];
                    case 3:
                        isUpdate = _a.sent();
                        if (isUpdate)
                            return [2 /*return*/, { success: true, msg: "조회수가 1 증가하였습니다." }];
                        return [2 /*return*/, {
                                success: false,
                                msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
                            }];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_5)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.deleteByNum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var num, isDelete, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        num = this.params.num;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BoardStorage.delete(num)];
                    case 2:
                        isDelete = _a.sent();
                        if (isDelete) {
                            return [2 /*return*/, { success: true, msg: "게시판 삭제 성공" }];
                        }
                        return [2 /*return*/, { success: false, msg: "게시판 삭제 실패" }];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_6)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categoryNum, title, boards_2, response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryNum = Category[this.query.categoryName];
                        title = this.query.content;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BoardStorage.findAllByIncludedTitleAndCategory(title, categoryNum)];
                    case 2:
                        boards_2 = _a.sent();
                        response = {
                            success: true,
                            msg: title + "(\uC73C)\uB85C \uAC80\uC0C9\uB41C \uACB0\uACFC\uC785\uB2C8\uB2E4.",
                            boards: boards_2,
                        };
                        return [2 /*return*/, response];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_7)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.updateOnlyStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var num, body, isUpdate, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        num = this.params.num;
                        body = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BoardStroage.updateOnlyStatusByNum(body, num)];
                    case 2:
                        isUpdate = _a.sent();
                        if (isUpdate)
                            return [2 /*return*/, {
                                    success: true,
                                    msg: "status가 변경되었습니다.",
                                    status: body.status,
                                }];
                        return [2 /*return*/, { success: false, msg: "존재하지않는 게시판" }];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err_8)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Board;
}());
module.exports = Board;
