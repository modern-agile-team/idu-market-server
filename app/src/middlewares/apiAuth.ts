import { Request, Response, NextFunction } from "express";
import Cryptor from "../models/utils/Cryptor";

export const apiAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const token: string = (req.headers["api-key"] as string) || "";

  // 토큰이 없으면 API를 사용하지 못하도록 막는다.
  if (token.length === 0) {
    return res.status(401).json({
      success: false,
      msg: "허가받지 못한 사이트는 해당 API를 이용할 수 없습니다.",
    });
  } else {
    const apiKey = await Cryptor.encryptBySalt(
      process.env.API_SECRET,
      process.env.API_SALT
    );

    if (token === apiKey) next();
    else {
      return res.status(401).json({
        success: false,
        msg: "허가받지 못한 사이트는 해당 API를 이용할 수 없습니다.",
      });
    }
  }
};
