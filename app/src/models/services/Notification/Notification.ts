import { Request } from "express";
import Error from "../../utils/Error";
import { params } from "../../../config/types";
import NotificationStorage from "./NotificationStorage";

interface response {
  success: boolean;
  msg: string;
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

class Notification {
  body: any;
  params: params;

  constructor(readonly req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  async createByBoardNum() : Promise<response | error> {
    const notification = this.body;
    const boardNum = Number(this.params.boardNum);

    try {
      const { success, num } = await NotificationStorage.create(boardNum, notification);
      
      if (success) {
        return { success: true, msg: "알림 생성 완료" }
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