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
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

interface notifications {
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

  async createByBoardNum() : Promise<response | error> {
    const notification = this.body;
    const boardNum = Number(this.params.num);
    const purchaseBoardNum = this.body.boardNum;
    const email = new Email(this.body);

    try {
      const { success } = await NotificationStorage.create(boardNum, notification, purchaseBoardNum);

      if (success) {
        const sendEmail: response | error = await email.sendAlarm(boardNum ? boardNum : purchaseBoardNum);
        
        return { success: true, msg: "알림 생성 완료", sendEmail }
      }
      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주세요"
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요", err);
    }
  }

  async findAllbyNickname() : Promise<response | error> {
    const nickname = this.body;

    try {
      const notifications = await NotificationStorage.findAllbyNickname(nickname);

      if (notifications) {
        return { success : true, msg: "알림 조회 성공", notifications }
      }
      return {
        success: false,
        msg: "알 수 없는 에러입니다. 서버 개발자에게 문의해주세요"
      };
    } catch (err) {
      return Error.ctrl("서버 에러입니다. 서버 개발자에게 문의해주세요", err);
    }
  }
}

export default Notification;