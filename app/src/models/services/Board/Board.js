"use strict";

const BoardStroage = require("./BoardStorage");
const Category = require("../Category/Category");
const String = require("../../utils/String");

class Board {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
    this.num = req.params.num;
  }

  async createByCategoryName() {
    const body = this.body;
    const categoryNum = Category[this.params.categoryName];
    body.price = String.makePrice(body.price);

    try {
      const isCreate = await BoardStroage.create(categoryNum, body);
      if (isCreate) {
        return { success: true, msg: "게시판 등록에 성공하셨습니다." };
      }
      return { success: false, msg: "게시판 등록에 실패하셨습니다." };
    } catch (err) {
      throw err;
    }
  }

  async findAllByCategoryName() {
    const categoryName = this.categoryName;
    try {
      const boards = await BoardStroage.findAllByCategoryName(categoryName);
      if (boards) {
        return { success: true, msg: "게시판 조회 성공", boards };
      }
      return { success: false, msg: "게시판 조회 실패" };
    } catch (err) {
      throw err;
    }
  }

  async detailFindOneByCategoryName() {
    const categoryName = this.categoryName;
    const num = this.num;
    try {
      const board = await BoardStroage.findByCategoryNameAndNum(
        categoryName,
        num
      );
      if (board) {
        return { success: true, msg: "게시판 상세 조회 성공", board };
      }
      return { success: false, msg: "게시판 상세 조회 실패" };
    } catch (err) {
      throw err;
    }
  }

  async updateByNo() {
    const num = this.request;
    const body = this.body;
    try {
      const board = await BoardStroage.update(body, num);
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
      const board = await BoardStroage.findOneByNum(num);
      if (!board) return { success: false, msg: "존재하지 않는 게시판입니다." };

      const isUpdate = await BoardStroage.updateOnlyHitByNum(num);
      if (isUpdate) return { success: true, msg: "조회수가 1 증가하였습니다." };

      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주십시오.",
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteByNo() {
    const num = this.num;
    try {
      const board = await BoardStroage.delete(num);
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
      const boards = await BoardStroage.findAllByIncludedTitleAndCategory(
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
