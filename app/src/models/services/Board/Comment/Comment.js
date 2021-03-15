const CommentStorage = require("./CommentStorage");

class Comment {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async createByBoardNum() {
    const body = this.body;
    const boardNum = this.params.num;
    try {
      let comment = await CommentStorage.create(body, boardNum);
      const commentNum = await CommentStorage.findOneCommentNum();
      comment = await CommentStorage.updateGroupNum(commentNum[0].no);
      if (comment) {
        return { success: true, msg: "댓글 생성 성공" };
      }
      return { success: false, msg: "댓글 생성 실패" };
    } catch (err) {
      throw err;
    }
  }

  async createReplyByGroupNum() {
    const body = this.body;
    const boardNum = this.params.num;
    const groupNum = this.params.groupNum;
    try {
      const comment = await CommentStorage.createReplyByGroupNum(
        body,
        boardNum,
        groupNum
      );
      if (comment) {
        await this.updateReply(groupNum);
        return { success: true, msg: "답글 생성 성공" };
      }
      return { success: false, msg: "답글 생성 실패" };
    } catch (err) {
      throw err;
    }
  }

  async updateByNo() {
    const commentNum = this.params.commentNum;
    const body = this.body;
    try {
      const comment = await CommentStorage.update(body, commentNum);
      if (comment) {
        return { success: true, msg: "댓글 수정 성공" };
      }
      return { success: false, msg: "댓글 수정 실패" };
    } catch (err) {
      throw err;
    }
  }

  async updateReply(groupNum) {
    try {
      const comment = await CommentStorage.updateReply(groupNum);
      if (comment) {
        return { success: true, msg: "플래그 설정 성공" };
      }
      return { success: false, msg: "플래그 설정 실패" };
    } catch (err) {
      throw err;
    }
  }

  async deleteCommentByNum() {
    const num = this.params.commentNum;
    try {
      const replyFlag = await CommentStorage.findOneReplyFlag(num);
      let comment = new Boolean(false);
      if (replyFlag.Num === 0) {
        comment = await CommentStorage.deleteCommentByNum(num);
      } else {
        const hidden = await CommentStorage.updatehiddenFlag(num);
        if (hidden) return { success: true, msg: "댓글 숨김 처리" };
      }
      if (comment) {
        return { success: true, msg: "댓글 삭제 성공" };
      }
      return { success: false, msg: "댓글 삭제 실패" };
    } catch (err) {
      throw err;
    }
  }

  async deleteReplyByNum() {
    const num = this.params.commentNum;
    try {
      const comment = await CommentStorage.deleteReplyByNum(num);
      if (comment) {
        return { success: true, msg: "답글 삭제 성공" };
      }
      return { success: false, msg: "답글 삭제 실패" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Comment;
