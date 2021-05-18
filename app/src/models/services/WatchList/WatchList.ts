import { Request } from "express";
import { params } from "../../../config/types";
import Error from "../../utils/Error";
import WatchListStorage from "./WatchListStorage";
import Category from "../Category/Category";

interface watchlist {
  num: number;
  studentId: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  sellerId: string;
  sellerName: string;
  categoryName: string;
  profilePath: string;
  commentCount: number;
  inDate: Date;
}

interface response {
  success: boolean;
  msg: string;
  watchLists?: watchlist[];
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

class WatchList {
  body: any;
  params: params;

  constructor(req: Request) {
    this.params = req.params;
    this.body = req.body;
  }

  async create(): Promise<response | error> {
    const studentId = this.params.studentId;
    const boardNum = this.body.boardNum;
    const categoryName = this.body.categoryName;
    const categoryNum = Category[categoryName];

    try {
      const watchList = await WatchListStorage.findOneByBoardNumAndStudentId(
        boardNum,
        studentId
      );
      if (!watchList) {
        const createdRowCount = await WatchListStorage.create(
          boardNum,
          categoryNum,
          studentId
        );
        if (createdRowCount)
          return { success: true, msg: "관심목록에 저장되었습니다." };
      }
      return { success: false, msg: "이미 관심목록에 저장되었습니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async findAllByStudentId(): Promise<response | error> {
    const studentId = this.params.studentId;
    try {
      const watchLists = await WatchListStorage.findAllByStudentId(studentId);
      return {
        success: true,
        msg: "관심목록 조회 성공하였습니다.",
        watchLists,
      };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async delete(): Promise<response | error> {
    const studentId = this.params.studentId;
    const product = this.body.boardNum;

    try {
      const deletedRowCount = await WatchListStorage.delete(studentId, product);
      if (deletedRowCount)
        return { success: true, msg: "정상적으로 삭제되었습니다." };
      return { success: false, msg: "이미 삭제되었습니다." };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }
}

export default WatchList;
