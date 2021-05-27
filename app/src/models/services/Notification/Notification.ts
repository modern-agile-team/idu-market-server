import { Request } from "express";
import Error from "../../utils/Error";
import { params } from "../../../config/types";
import NotificationStorage from "./NotificationStorage";
import Email from "../Email/Email";

interface response {
  success: boolean;
  msg: string;
  notifications?: notifications[];
  sendEmail?: response | error;
  readFlag?: number;
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

interface notifications {
  num: number;
  senderNickname: string;
  notiCategoryNum: number;
  inDate: string;
  readFlag: number;
  boardTitle: string;
}

class Notification {
  private body: any;
  private params: params;

  constructor(readonly req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  async createByTitleAndNickname(
    title: string,
    recipientNickname: string
  ): Promise<Boolean | error> {
    const notification = this.body;
    const boardNum = Number(this.params.num);
    const purchaseBoardNum = notification.boardNum;
    const email = new Email(notification);

    try {
      const isCreateNotification = await NotificationStorage.create(
        boardNum,
        notification,
        purchaseBoardNum,
        recipientNickname
      );

      if (isCreateNotification) {
        const emailAddress: string =
          await NotificationStorage.findEmailByNickname(recipientNickname);

        const sendedInfo = await email.sendAlarm(
          emailAddress,
          title,
          recipientNickname
        );
        if ("success" in sendedInfo) return sendedInfo.success;
      }
      return false;
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요", err);
    }
  }

  async findAllbyNickname(): Promise<response | error> {
    const studentId = this.params.studentId;

    try {
      const notifications = await NotificationStorage.findAllbyNickname(
        studentId
      );

      if (notifications) {
        return { success: true, msg: "알림 조회 성공", notifications };
      }
      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주세요",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요", err);
    }
  }

  async updateReadFlag(): Promise<response | error> {
    const notificationNum = this.body.notificationNum;

    try {
      const isUpdateReadFlag = await NotificationStorage.updateReadFlag(
        notificationNum
      );

      if (isUpdateReadFlag) {
        return {
          success: true,
          msg: "알람 읽음",
          readFlag: isUpdateReadFlag,
        };
      }
      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주세요",
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요", err);
    }
  }
}

export default Notification;
