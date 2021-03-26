"use strict";

const BoardStorage = require("./BoardStorage");
const Category = require("../Category/Category");
const String = require("../../utils/String");
const CommentStorage = require("./Comment/CommentStorage");
const BoardStroage = require("./BoardStorage");

class Board {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async createByCategoryName() {
    const board = this.body;
    const categoryName = this.params.categoryName;
    const categoryNum = Category[categoryName];

    if (categoryNum === undefined)
      return { success: false, msg: "존재하지 않는 게시판입니다." };

    if (!board.thumbnail) {
      board.thumbnail = process.env.DEFAULT_THUMBNAIL;
    }

    if (!board.price) {
      board.price = "0";
    }

    if (board.price < 0 || board.price.toString().length >= 8) {
      return {
        success: false,
        msg: "가격은 0 ~ 9999999 까지만 입력 가능합니다.",
      };
    }
    board.price = String.makePrice(board.price);

    try {
      const { success, num } = await BoardStorage.create(categoryNum, board);
      if (success) {
        return { success: true, msg: "게시판 생성에 성공하셨습니다.", num };
      }
      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
      };
    } catch (err) {
      throw err;
    }
  }

  async findAllByCategoryNum() {
    const categoryName = this.params.categoryName;
    const categoryNum = Category[categoryName];
    const lastNum = this.query.lastNum;

    try {
      const boards = await BoardStorage.findAllByCategoryNum(
        categoryNum,
        lastNum
      );
      if (boards) {
        return { success: true, msg: "게시판 조회 성공", boards };
      }
    } catch (err) {
      throw err;
    }
  }

  async findOneByNum() {
    const num = this.params.num;
    const categoryName = this.params.categoryName;
    const categoryNum = Category[categoryName];
    const studentId = this.params.studentId;

    try {
      const board = await BoardStorage.findOneByNum(num);
      const comments = await CommentStorage.findAllByBoardNum(num);
      const watchListFlag = await BoardStorage.findOneWatchListFlag(
        studentId,
        num
      );
      if (categoryNum === board.categoryNum) {
        return {
          success: true,
          msg: "게시판 상세 조회 성공",
          board,
          comments,
          watchListFlag,
        };
      }
      return { success: false, msg: "게시판 상세 조회 실패" };
    } catch (err) {
      throw err;
    }
  }

  async updateByNum() {
    const num = this.params.num;
    const body = this.body;

    if (body.price < 0 || body.price.toString().length >= 8) {
      return {
        success: false,
        msg: "가격은 0 ~ 9999999 까지만 입력 가능합니다.",
      };
    }
    body.price = String.makePrice(body.price);

    try {
      const board = await BoardStorage.findOneByNum(num);
      if (!board) return { success: false, msg: "존재하지 않는 게시판입니다." };

      const { success, boardNum } = await BoardStorage.updateByNum(body, num);
      if (success) {
        return {
          success: true,
          msg: "게시판 수정에 성공하셨습니다.",
          num: boardNum,
        };
      }
      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
      };
    } catch (err) {
      throw err;
    }
  }

  async updateOnlyHit() {
    const categoryNum = Category[this.params.categoryName];
    const num = this.params.num;

    if (!categoryNum)
      return { success: false, msg: "존재하지 않는 게시판입니다." };

    try {
      const board = await BoardStorage.findOneByNum(num);
      if (!board) return { success: false, msg: "존재하지 않는 게시판입니다." };

      const isUpdate = await BoardStorage.updateOnlyHitByNum(num);
      if (isUpdate) return { success: true, msg: "조회수가 1 증가하였습니다." };

      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteByNum() {
    const num = this.params.num;
    try {
      const isDelete = await BoardStorage.delete(num);
      if (isDelete) {
        return { success: true, msg: "게시판 삭제 성공" };
      }
      return { success: false, msg: "게시판 삭제 실패" };
    } catch (err) {
      throw err;
    }
  }

  async search() {
    const categoryNum = Category[this.query.categoryName];
    const title = this.query.content;

    try {
      const boards = await BoardStorage.findAllByIncludedTitleAndCategory(
        title,
        categoryNum
      );

      const response = {
        success: true,
        msg: `${title}(으)로 검색된 결과입니다.`,
        boards,
      };

      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateOnlyStatus() {
    const num = this.params.num;
    const body = this.body;

    try {
      const isUpdate = await BoardStroage.updateOnlyStatusByNum(body, num);
      if (isUpdate)
        return {
          success: true,
          msg: "status 변경 성공되었습니다.",
          status: body.status,
        };
      return { success: false, msg: "존재하지않는 게시판" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Board;
