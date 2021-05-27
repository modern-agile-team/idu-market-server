import { Request } from "express";
import CommentStorage from "./CommentStorage";

import Error from "../../../utils/Error";
import { params, query } from "../../../../config/types";
import Notification from "../../Notification/Notification";
import NotificationStorage from "../../Notification/NotificationStorage";

interface response {
  success: boolean;
  msg: string;
  deletedCommentNum?: number;
  deletedReplyNum?: number;
  buyers?: buyer[];
  createdComments?: comment;
  createdReply?: comment;
  updatedComment?: updatedComment | undefined;
  updatedReply?: updatedComment | undefined;
  isDelete?: number;
  alarm?: response | error;
}

interface updatedComment {
  depth: number;
}

interface buyer {
  nickname: string;
}

interface comment {
  studentId: string;
  studentName: string;
  nickname: string;
  num: number;
  content: string;
  groupNum: number;
  depth: number;
  replyFlag: number;
  hiddenFlag: number;
  inDate: string;
  updateDate: string;
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

class Comment {
  body: any;
  params: params;
  query: query;

  constructor(readonly req: Request) {
    this.req = req;
    this.body = req.body;
    this.params = req.params;
  }

  async createByBoardNum(): Promise<response | error> {
    const body = this.body;
    const boardNum: number = parseInt(this.params.num as string);
    const notification = new Notification(this.req);

    try {
      const { isCreate, num } = await CommentStorage.createByBoardNum(
        body,
        boardNum
      );

      if (isCreate) {
        const comment = await CommentStorage.findOneByNum(num);

        const createdComments: comment = comment[0];

        const isUpdate = await CommentStorage.updateGroupNum(
          createdComments.num
        );

        // 여러명의 알림 수신자들에게 모두 전송하기 위해 반복문 순회
        body.recipientNicknames.forEach(async (recipientNickname) => {
          if (recipientNickname !== body.senderNickname) {
            // 수신자와 발신자가 다를 경우에만 알림 생성
            const title: string = await NotificationStorage.findTitleByBoardNum(
              boardNum
            );

            await notification.createByTitleAndNickname(
              title,
              recipientNickname
            );
          }
        });

        if (isUpdate) {
          createdComments.groupNum = createdComments.num;
          createdComments.groupNum = createdComments.num;
          return {
            success: true,
            msg: "댓글이 생성되었습니다.",
            createdComments,
          };
        }
        return {
          success: false,
          msg: "댓글 Group Number 업데이트 실패. 서버 개발자에게 문의 바랍니다.",
        };
      }
      return { success: false, msg: "댓글 생성 실패" };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async createReplyByGroupNum(): Promise<response | error> {
    const body: any = this.body;
    const boardNum: number = parseInt(this.params.num as string);
    const groupNum: number = parseInt(this.params.groupNum as string);
    const notification = new Notification(this.req);

    try {
      const { isCreate, num } = await CommentStorage.createReplyByGroupNum(
        body,
        boardNum,
        groupNum
      );
      if (isCreate) {
        const isUpdateReplyFlag =
          await CommentStorage.updateReplyFlagOfCommentByGroupNum(groupNum);

        if (isUpdateReplyFlag) {
          const replies = await CommentStorage.findOneByNum(num);
          const reply: comment[] = Object.values(
            JSON.parse(JSON.stringify(replies))
          );
          const createdReply: comment = reply[0];

          // 여러명의 알림 수신자들에게 모두 전송하기 위해 반복문 순회
          body.recipientNicknames.forEach(async (recipientNickname) => {
            // 수신자와 발신자가 다를 경우에만 알림 생성
            if (recipientNickname !== body.senderNickname) {
              const title: string =
                await NotificationStorage.findTitleByBoardNum(boardNum);

              await notification.createByTitleAndNickname(
                title,
                recipientNickname
              );
            }
          });

          return {
            success: true,
            msg: "답글 생성에 성공하셨습니다.",
            createdReply,
          };
        }
      }
      return { success: false, msg: "답글 생성에 실패하셨습니다." };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async findStudentId(): Promise<response | error> {
    const boardNum: number = parseInt(this.params.num as string);
    try {
      const buyers: buyer[] = await CommentStorage.findOneByBoardNum(boardNum);

      return {
        success: true,
        msg: "구매 희망자 조회에 성공하셨습니다.",
        buyers,
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async updateByNum(): Promise<response | error> {
    const commentNum: number = parseInt(this.params.commentNum);
    const body = this.body;
    try {
      const isUpdate: boolean = await CommentStorage.updateByNum(
        body,
        commentNum
      );

      if (isUpdate) {
        const comment = await CommentStorage.findOneByNum(commentNum);

        const updatedComment: comment = comment[0];

        const response = {
          success: true,
          msg: "",
          updatedReply: undefined,
          updatedComment: undefined,
        };

        if (updatedComment.depth) {
          response.msg = "답글 수정 성공";
          response.updatedReply = updatedComment;
        } else {
          response.msg = "댓글 수정 성공";
          response.updatedComment = updatedComment;
        }

        return response;
      }
      return {
        success: false,
        msg: "댓글을 수정한 studentId와 수정될 commentNum이 올바른지 확인하십시오.",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async deleteCommentByNum(): Promise<response | error> {
    const num: number = parseInt(this.params.commentNum as string);
    const studentId: string = this.body.studentId;

    try {
      const replyFlag = await CommentStorage.findReplyFlag(num);
      let isDelete = false;

      if (replyFlag === 1) {
        // 답글이 있으면 숨김 처리
        const isUpdateHidden: boolean = await CommentStorage.updatehiddenFlag(
          num
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
        isDelete = await CommentStorage.deleteCommentByNum(num, studentId);
      }

      if (isDelete) {
        return {
          success: true,
          msg: "댓글 삭제 성공",
          deletedCommentNum: num,
        };
      }
      return {
        success: false,
        msg: "답글을 삭제하려면 depth가 1이어야 합니다. 댓글을 삭제하려는 것이 맞다면 댓글 번호가 올바른지 확인해 주십시오.",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }

  async deleteReplyByNum(): Promise<response | error> {
    const num: number = parseInt(this.params.commentNum as string);
    const studentId: string = this.body.studentId;

    const groupNum: number = await CommentStorage.findOneGroupNum(num);
    try {
      const isDelete: boolean = await CommentStorage.deleteReplyByNum(
        num,
        studentId
      );
      const replyFlag: boolean = await CommentStorage.updateReplyFlag(groupNum);
      if (replyFlag) {
        const hiddenFlag: number = await CommentStorage.findOneHiddenFlag(
          groupNum
        );
        if (hiddenFlag === 1) {
          const isDeleteHidden: boolean =
            await CommentStorage.deleteHiddenComment(groupNum);
          if (isDeleteHidden) {
            return {
              success: true,
              msg: "답글 삭제 및 숨김 댓글 삭제",
              deletedCommentNum: groupNum, // 숨김 처리 되어있던 댓글이 삭제됨. 따라서 함께 응답하여 클라이언트에서 해당 메인 댓글을 UI에서 제거할 수 있도록 한다.
              deletedReplyNum: num, // 삭제된 답글의 정보도 응답한다.
            };
          }
        }
      }
      if (isDelete) {
        return {
          success: true,
          msg: "답글 삭제 성공",
          deletedReplyNum: num,
        };
      }
      return {
        success: false,
        msg: "댓글을 삭제하려면 depth가 0이어야 합니다. 답글을 삭제하려는 것이 맞다면 답글 번호가 올바른지 확인해 주십시오.",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요.", err);
    }
  }
}

export default Comment;
