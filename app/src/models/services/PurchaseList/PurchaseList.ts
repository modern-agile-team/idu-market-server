/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { params } from "../../../config/types";
import Error from "../../utils/Error";
import PurchaseListStorage from "./PurchaseListStorage";

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

interface response {
  success: boolean;
  msg: string;
  purchaseList?: purchaseList[];
}

interface purchaseList {
  num: number;
  buyerId: string;
  buyerName: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  categoryName: string;
  commentCount: number;
  inDate: Date;
  sellerId: string;
  sellerName: string;
  profilePath: string;
}

class PurchaseList {
  params: params;
  body: any;
  constructor(readonly req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  async read(): Promise<error | response> {
    const studentId: string = this.params.studentId;
    try {
      const purchaseList = await PurchaseListStorage.findAllById(studentId);
      return {
        success: true,
        msg: "구매목록 조회 성공했습니다.",
        purchaseList,
      };
    } catch (err) {
      return Error.ctrl("서버 개발자에게 문의해주십시오", err);
    }
  }

  async create(): Promise<error | response> {
    const client = this.body;
    try {
      const isExist = await PurchaseListStorage.isExist(client);
      if (isExist.length === 0) {
        const student = await PurchaseListStorage.findNicknameById(client);
        const response = await PurchaseListStorage.create(student, client);
        if (response)
          return { success: true, msg: "구매목록에 저장되었습니다" };
      }
      return { success: false, msg: "이미 구매목록에 저장이 되었습니다." };
    } catch (err) {
      return Error.ctrl("존재하지 않는 게시판 혹은 이름입니다.", err);
    }
  }
}

export default PurchaseList;
