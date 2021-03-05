'use strict'

const BoardStroage = require("./BoardStorage");
const BoardCode = require("./BoardCode");

class Board {
    constructor(req) {
        this.body = req.body;
        this.codeName = req.params.codeName;
        this.num = req.params.num;
    }
    
    async createByCodeName() {
        const body = this.body;
        const codeName = this.codeName;
        const codeNum = BoardCode.findNumByName[codeName];
        try {
            const data = await BoardStroage.create(codeNum, body);
            if (data) {
                return { success : true, msg : "게시판 생성 성공" };
            }
            return { success : false, msg : "게시판 생성 실패" };
        } catch (err) {
            throw err;
        }
    }

    async findAllByCodeName() {
        const codeName = this.codeName;
        try {
            const data  = await BoardStroage.findAllByCodeNum(codeName);
            if (data) {
                return { success : true, msg : "게시판 조회 성공", data };
            }
            return { success : false, msg : "게시판 조회 실패" };
        } catch (err) {
            throw err;
        }
    }

    async detailFindOneByCodeName() {
        const codeName = this.codeName;
        const num = this.num;
        try {
            const data  = await BoardStroage.findByCodeNumAndNo(codeName, num);
            if (data) {
                return { success : true, msg : "게시판 상세 조회 성공", data };
            }
            return { success : false, msg : "게시판 상세 조회 실패" };
        } catch (err) {
            throw err;
        }
    }



    async updateByNo() {
        const num = this.num;
        const body = this.body;
        try {
            const data = await BoardStroage.update(body, num);
            if (data) {
                return { success : true, msg : "게시판 수정 성공" };
            }
            return { success : false, msg : "게시판 수정 실패" };
        } catch (err) {
            throw err;
        }
    }

    async deleteByNo() {
        const num = this.num;
        try {
            const data = await BoardStroage.delete(num);
            if (data) {
                return { success : true, msg : "게시판 삭제 성공" };
            }
            return { success : false, msg : "게시판 삭제 실패" };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Board;