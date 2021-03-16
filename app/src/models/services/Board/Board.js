"use strict";

const BoardStorage = require("./BoardStorage");
const Category = require("../Category/Category");
const String = require("../../utils/String");
const CommentStorage = require("./Comment/CommentStorage");

class Board {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async createByCategoryName() {
    const body = this.body;
    const categoryName = this.params.categoryName;
    const categoryNum = Category[categoryName];
    body.price = String.makePrice(body.price);

    try {
      const board = await BoardStorage.create(categoryNum, body);
      if (board) {
        return { success: true, msg: "게시판 생성 성공" };
      }
      return { success: false, msg: "게시판 등록에 실패하셨습니다." };
    } catch (err) {
      throw err;
    }
  }

  async findAllByCategoryNum() {
    const categoryName = this.params.categoryName;
    const categoryNum = Category[categoryName];
    try {
      const boards = await BoardStorage.findAllByCategoryNum(categoryNum);
      if (boards) {
        return { success: true, msg: "게시판 조회 성공", boards };
      }
    } catch (err) {
      throw err;
    }
  }

  async findOneByNum() {
    const num = this.params.num;
    try {
      const board = await BoardStorage.findOneByNum(num);
      const comment = await CommentStorage.findOneByBoardNum(num);
      if (board) {
        return { success: true, msg: "게시판 상세 조회 성공", board, comment };
      }
      return { success: false, msg: "게시판 상세 조회 실패" };
    } catch (err) {
      throw err;
    }
  }

  async updateByNum() {
    const num = this.params.num;
    const body = this.body;
    body.price = String.makePrice(body.price);
    try {
      const board = await BoardStorage.updateByNum(body, num);
      if (board) {
        return { success: true, msg: "게시판 수정 성공" };
      }
      return { success: false, msg: "게시판 수정 실패" };
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
      const board = await BoardStorage.delete(num);
      if (board) {
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
}

module.exports = Board;
