const Auth = require("../models/services/Auth/Auth");

// 로그인 된 유저들만 서비스 이용을 허가하는 미들웨어
const logined = async (req, res, next) => {
  const token = req.headers.token;

  // 토큰 없음
  if (!token)
    return res.json({ success: false, msg: "JWT가 존재하지 않습니다." });

  // decode
  const user = await Auth.verifyJWT(token);
  // 유효기간 만료
  if (user === Auth.TOKEN_EXPIRED)
    return res.status(403).json({
      success: false,
      msg: "JWT의 유효 시간이 만료되었습니다.",
    });
  // 유효하지 않는 토큰
  if (user === Auth.TOKEN_INVALID)
    return res
      .status(403)
      .json({ success: false, msg: "유효하지 않은 JWT 입니다." });
  if (user.id === undefined)
    return res
      .status(403)
      .json({ success: false, msg: "유효하지 않은 JWT 입니다." });

  req.id = user.id;
  next();
};

// 로그인이 안된 유저들만 서비스 이용을 허가하는 미들웨어
const notLogined = async (req, res, next) => {
  const token = req.headers.token;

  // 토큰 없으면 로그인이 안된 것이므로 허용한다.
  if (!token) next();
  else {
    // decode
    const user = await Auth.verifyJWT(token);
    // 유효기간 만료 || 유효하지 않는 토큰 || 없는 아이디
    if (
      user === Auth.TOKEN_EXPIRED ||
      user === Auth.TOKEN_INVALID ||
      user.id === undefined
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

module.exports = { logined, notLogined };
