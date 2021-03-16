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
      let isCreate = await CommentStorage.createByBoardNum(body, boardNum);
      const commentNum = await CommentStorage.findOneCommentNum();
      isCreate = await CommentStorage.updateGroupNum(commentNum[0].no);
      if (isCreate) {
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
      const isCreate = await CommentStorage.createReplyByGroupNum(
        body,
        boardNum,
        groupNum
      );
      if (isCreate) {
        const replyFlag = await this.updateComment(groupNum);
        return { success: true, msg: "답글 생성 성공", replyFlag };
      }
      return { success: false, msg: "답글 생성 실패" };
    } catch (err) {
      throw err;
    }
  }

  async updateComment(groupNum) {
    try {
      const isUpdateComment = await CommentStorage.updateComment(groupNum);
      if (isUpdateComment) {
        return { success: true, msg: "플래그 설정 성공" };
      }
      return { success: false, msg: "플래그 설정 실패" };
    } catch (err) {
      throw err;
    }
  }

  async updateByNum() {
    const commentNum = this.params.commentNum;
    const body = this.body;
    try {
      const isUpdate = await CommentStorage.updateByNum(body, commentNum);
      if (isUpdate === 1) {
        return { success: true, msg: "댓글 수정 성공" };
      }
      return { success: false, msg: "댓글 수정 실패" };
    } catch (err) {
      throw err;
    }
  }

  async deleteCommentByNum() {
    const num = this.params.commentNum;
    try {
      const replyFlag = await CommentStorage.findOneReplyFlag(num);
      let isDelete = new Boolean(false);
      if (replyFlag === 0) {
        isDelete = await CommentStorage.deleteCommentByNum(num);
      } else {
        const isUpdateHidden = await CommentStorage.updatehiddenFlag(num);
        if (isUpdateHidden) return { success: true, msg: "댓글 숨김 처리" };
      }
      if (isDelete === 1) {
        return { success: true, msg: "댓글 삭제 성공" };
      }
      return { success: false, msg: "댓글 삭제 실패" };
    } catch (err) {
      throw err;
    }
  }

  async deleteReplyByNum() {
    const num = this.params.commentNum;
    const body = this.body;
    const groupNum = await CommentStorage.findOneGroupNum(num);
    try {
      const isDelete = await CommentStorage.deleteReplyByNum(num, body);
      const replyFlag = await CommentStorage.updateReplyFlag(groupNum);
      if (replyFlag === 1) {
        const hiddenFlag = await CommentStorage.findOneHiddenFlag(groupNum);
        if (hiddenFlag === 1) {
          const response = await CommentStorage.deleteHiddenComment(groupNum);
          if (response) {
            return { success: true, msg: "답글 삭제 및 숨김 댓글 삭제" };
          }
        }
      }
      if (isDelete === 1) {
        return { success: true, msg: "답글 삭제 성공" };
      }
      return { success: false, msg: "답글 삭제 실패" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Comment;
