const CommentStorage = require("./CommentStorage");
const Error = require("../../../utils/Error");

class Comment {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async createByBoardNum() {
    const body = this.body;
    const boardNum = this.params.num;

    try {
      const { isCreate, num } = await CommentStorage.createByBoardNum(
        body,
        boardNum
      );

      if (isCreate) {
        const comment = await CommentStorage.findOneByNum(num);
        const isUpdate = await CommentStorage.updateGroupNum(comment.num);
        if (isUpdate) {
          comment.groupNum = comment.num;
          return { success: true, msg: "댓글 생성 성공", comment };
        }
        return {
          success: false,
          msg:
            "댓글 Group Number 업데이트 실패. 서버 개발자에게 문의 바랍니다.",
        };
      }

      return { success: false, msg: "댓글 생성 실패" };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async createReplyByGroupNum() {
    const body = this.body;
    const boardNum = this.params.num;
    const groupNum = this.params.groupNum;

    try {
      const { isCreate, num } = await CommentStorage.createReplyByGroupNum(
        body,
        boardNum,
        groupNum
      );
      if (isCreate) {
        const isUpdateReplyFlag = await CommentStorage.updateReplyFlagOfCommentByGroupNum(
          groupNum
        );

        if (isUpdateReplyFlag) {
          const reply = await CommentStorage.findOneByNum(num);
          return { success: true, msg: "답글 생성 성공", reply };
        }
      }
      return { success: false, msg: "답글 생성 실패" };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async updateByNum() {
    const commentNum = this.params.commentNum;
    const body = this.body;
    try {
      const isUpdate = await CommentStorage.updateByNum(body, commentNum);

      if (isUpdate) {
        const comment = await CommentStorage.findOneByNum(commentNum);

        return {
          success: true,
          msg: "댓글 수정 성공",
          comment: comment.depth ? undefined : comment, // depth가 1이면 답글이므로 undefined를 반환하여 해당 키가 응답되지 않도록 한다.
          reply: comment.depth ? comment : undefined, // depth가 0이면 댓글이므로 undefined를 반환하여 해당 키가 응답되지 않도록 한다.
        };
      }
      return {
        success: false,
        msg:
          "댓글을 수정한 studentId와 수정될 commentNum이 올바른지 확인하십시오.",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async deleteCommentByNum() {
    const num = this.params.commentNum;
    try {
      const replyFlag = await CommentStorage.findReplyFlag(num);
      let isDelete = false;

      if (replyFlag) {
        // 답글이 있으면 숨김 처리
        const isUpdateHidden = await CommentStorage.updatehiddenFlag(
          parseInt(num)
        );
        if (isUpdateHidden) {
          return {
            success: true,
            msg: "댓글 숨김 처리",
            deletedCommentNum: num,
          };
        }
      } else {
        // 답글이 없으면 삭제
        isDelete = await CommentStorage.deleteCommentByNum(num);
      }

      if (isDelete) {
        return {
          success: true,
          msg: "댓글 삭제 성공",
          deletedCommentNum: parseInt(num),
        };
      }
      return {
        success: false,
        msg:
          "답글을 삭제하려면 depth가 1이어야 합니다. 댓글을 삭제하려는 것이 맞다면 댓글 번호가 올바른지 확인해 주십시오.",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async deleteReplyByNum() {
    const num = this.params.commentNum;
    const studentId = this.body.studentId;

    const groupNum = await CommentStorage.findOneGroupNum(num);
    try {
      const isDelete = await CommentStorage.deleteReplyByNum(num, studentId);
      const replyFlag = await CommentStorage.updateReplyFlag(groupNum);
      if (replyFlag === 1) {
        const hiddenFlag = await CommentStorage.findOneHiddenFlag(groupNum);
        if (hiddenFlag === 1) {
          const isDeleteHidden = await CommentStorage.deleteHiddenComment(
            groupNum
          );
          if (isDeleteHidden) {
            return {
              success: true,
              msg: "답글 삭제 및 숨김 댓글 삭제",
              deletedCommentNum: groupNum, // 숨김 처리 되어있던 댓글이 삭제됨. 따라서 함께 응답하여 클라이언트에서 해당 메인 댓글을 UI에서 제거할 수 있도록 한다.
              deletedReplyNum: parseInt(num), // 삭제된 답글의 정보도 응답한다.
            };
          }
        }
      }
      if (isDelete === 1) {
        return {
          success: true,
          msg: "답글 삭제 성공",
          deletedReplyNum: parseInt(num),
        };
      }
      return {
        success: false,
        msg:
          "댓글을 삭제하려면 depth가 0이어야 합니다. 답글을 삭제하려는 것이 맞다면 답글 번호가 올바른지 확인해 주십시오.",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async findStudentIdByNum() {
    const board = [this.params.num];
    try {
      const buyers = await CommentStorage.findStudentIdByNum(board);
      return { success: true, msg: "comments조회 완료 되었습니다.", buyers };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }
}

module.exports = Comment;
