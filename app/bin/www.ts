import app from "../app";
import logger from "../src/config/logger";
// import logger from "../config/logger";

const PORT: number = Number(process.env.PORT) || 3000;

app
  .listen(PORT, () => {
    console.log(`${PORT} 포트에서 서버가 가동되었습니다.`);
    // logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
  })
  .on("error", (err) => {
    console.error(err);
    // logger.error(err);
  });
