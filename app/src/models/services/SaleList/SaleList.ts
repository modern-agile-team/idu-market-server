/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import SaleListStorage from "./SaleListStorage";
import Error from "../../utils/Error";
import { params } from "../../../config/types";

interface saleLists {
  num: number;
  sellerName: string;
  profilePath: string;
  thumbnail: string;
  title: string;
  hit: number;
  price: string;
  categoryName: string;
  commentCount: number;
  inDate: Date;
}

interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

interface response {
  success: boolean;
  msg: string;
  saleLists?: saleLists[];
}

class SaleList {
  params: params;
  constructor(readonly req: Request) {
    this.params = req.params;
  }

  async read(): Promise<response | error> {
    const studentId: string = this.params.studentId;

    try {
      const saleLists = await SaleListStorage.findAllByStatus(studentId);
      if (saleLists.length !== 0)
        return {
          success: true,
          msg: "판매내역 조회 완료되었습니다.",
          saleLists: saleLists,
        };
      return { success: false, msg: "판매내역이 존재하지않습니다." };
    } catch (err) {
      return Error.ctrl("서버측 문제", err);
    }
  }
}

export default SaleList;
