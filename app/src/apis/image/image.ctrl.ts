import { Response, Request } from "express";
import logger from "../../config/logger";
import { deleteImage } from "../../middlewares/s3";

const process = {
  upload: async (req: Request, res: Response): Promise<Response> => {
    const images = req.files as Express.MulterS3.File[];
    try {
      const path: string[] = images.map(
        (img: Express.MulterS3.File) => img.location
      );
      logger.info(`POST /api/image 200 업로드 성공`);
      return res
        .status(200)
        .json({ success: true, msg: "업로드 성공되었습니다.", url: path });
    } catch (err) {
      logger.error(`POST /api/image 400 업로드 실패 err: ${err}`);
      return res
        .status(400)
        .json({ success: false, msg: "이미지가 없습니다." });
    }
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const rest = req.body.url;

    if (rest.length) {
      const keys: string[] = [];

      rest.forEach((img: string) => {
        const cutUrl: string[] = img.split("/");
        const length: number = cutUrl.length;
        const key = `${cutUrl[length - 2]}/${cutUrl[length - 1]}`;
        keys.push(key);
      });

      const response = await deleteImage(keys);
      if (response) {
        logger.info(`POST /api/image/remove 200 삭제 성공`);
        return res
          .status(200)
          .json({ success: true, msg: "삭제 완료되었습니다." });
      }
      logger.error(`POST /api/image/remove 400 s3 접근 오류`);
      return res.status(400).json({ success: false, msg: "s3 접근 오류" });
    }
    logger.error(`POST /api/image/remove 400 이미지가 없습니다.`);
    return res.status(400).json({ success: false, msg: "사진이 없습니다." });
  },
};

export default process;
