"use strict";

const BoardStorage = require("./BoardStorage");
const BoardCode = require("../Category/Category");
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
    const categoryNum = BoardCode[categoryName];
    body.price = String.makePrice(body.price);
    try {
      const board = await BoardStorage.create(categoryNum, body);
      if (board) {
        return { success: true, msg: "게시판 생성 성공" };
      }
      return { success: false, msg: "게시판 생성 실패" };
    } catch (err) {
      throw err;
    }
  }

  async findAllByCategoryNum() {
    const categoryName = this.params.categoryName;
    const categoryNum = BoardCode[categoryName];
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

  async updateByNo() {
    const num = this.params.num;
    const body = this.body;
    body.price = String.makePrice(body.price);
    try {
      const board = await BoardStorage.update(body, num);
      if (board) {
        return { success: true, msg: "게시판 수정 성공" };
      }
      return { success: false, msg: "게시판 수정 실패" };
    } catch (err) {
      throw err;
    }
  }

  async deleteByNo() {
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
}

module.exports = Board;
