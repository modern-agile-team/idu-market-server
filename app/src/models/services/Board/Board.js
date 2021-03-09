"use strict";

const BoardStroage = require("./BoardStorage");
const BoardCode = require("../Category/Category");

class Board {
  constructor(req) {
    this.body = req.body;
    this.categoryName = req.params.categoryName;
    this.num = req.params.num;
  }

  async createBycategoryName() {
    const body = this.body;
    const categoryName = this.categoryName;
    const categoryNum = BoardCode[categoryName];
    try {
      const board = await BoardStroage.create(categoryNum, body);
      if (board) {
        return { success: true, msg: "게시판 생성 성공" };
      }
      return { success: false, msg: "게시판 생성 실패" };
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
    const num = this.num;
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
}

module.exports = Board;
