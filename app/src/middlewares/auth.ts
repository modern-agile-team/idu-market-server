import { Request, Response, NextFunction } from "express";

import Auth from "../models/services/Auth/Auth";

interface Student {
  id?: string;
  email?: string;
  name?: string;
  profile_path?: string;
  admin_flag?: number;
  err?: string;
}

// 로그인 된 유저들만 서비스 이용을 허가하는 미들웨어
const logined = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = (req.headers["x-auth-token"] as string) || "";

  // 토큰 없음
  if (token.length === 0)
    return res
      .status(401)
      .json({ success: false, msg: "JWT가 존재하지 않습니다." });

  // decode
  const auth: Student = await Auth.verifyJWT(token);

  // 유효기간 만료
  if (auth.err === Auth.TOKEN_EXPIRED)
    return res.status(401).json({
      success: false,
      msg: "JWT의 유효 시간이 만료되었습니다.",
    });
  // 유효하지 않는 토큰
  if (auth.err === Auth.TOKEN_INVALID)
    return res
      .status(401)
      .json({ success: false, msg: "유효하지 않은 JWT 입니다." });
  if (auth.id === undefined)
    return res
      .status(401)
      .json({ success: false, msg: "유효하지 않은 JWT 입니다." });

  req.auth = auth;
  next();
};

// 로그인이 안된 유저들만 서비스 이용을 허가하는 미들웨어
const notLogined = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = (req.headers["x-auth-token"] as string) || "";

  // 토큰 없으면 로그인이 안된 것이므로 허용한다.
  if (token.length === 0) next();
  else {
    // decode
    const auth = await Auth.verifyJWT(token);
    // 유효기간 만료 || 유효하지 않는 토큰 || 없는 아이디
    if (
      auth.err === Auth.TOKEN_EXPIRED ||
      auth.err === Auth.TOKEN_INVALID ||
      auth.id === undefined
    ) {
      next();
    } else {
      // 유효한 토큰이라면 403을 반환하여 로그인 페이지로의 접근을 막는다.
      res.status(403).json({
        success: false,
        msg: "이미 로그인 된 사용자입니다.",
      });
    }
  }
};

export default { logined, notLogined };
