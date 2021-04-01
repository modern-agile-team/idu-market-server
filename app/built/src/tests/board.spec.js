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
var request = require("supertest");
var app = require("../../app");
var server = request(app);
var board = {
    studentId: "test1",
    title: "테스트2",
    content: "테스트2",
    price: "200000",
};
describe("게시판 API 테스트", function () {
    it("POST 게시판 생성 시 201 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server.post("/api/boards/book").send(board)];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("GET 게시판 조회 시 200 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server.get("/api/boards/book")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("GET 게시판 상세 조회 시 200 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server.get("/api/boards/book/767/test")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("PUT 게시판 수정 시 200 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server
                            .put("/api/boards/book/760")
                            .send({ title: "test2", content: "test2", price: "200000" })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("PATCH 게시판 조회 수 1증가 시 200 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server.patch("/api/boards/book/765")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    console.log(err_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("PATCH 게시판 status 변경 시 200 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server
                            .patch("/api/boards/book/767/status")
                            .send({ status: 2 })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    console.log(err_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("DELETE 게시판 삭제 시 200 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server.delete("/api/boards/book/763")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    console.log(err_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("DELETE 게시판 삭제 시 200 반환", function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, server.delete("/api/boards/book/763")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_8 = _a.sent();
                    console.log(err_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
