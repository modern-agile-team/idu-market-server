import * as express from "express";
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import * as aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "wooahan-agile/board",
    acl: "public-read",
    key: function (req: express.Request, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
  limits: { fieldSize: 100 * 1024 * 1024 },
});

export const deleteImage = async (
  keys: string[]
): Promise<aws.S3.DeleteObjectsOutput | aws.AWSError> => {
  const objectKeys = [];
  for (const key of keys) {
    const rest = {
      Key: key,
    };
    objectKeys.push(rest);
  }

  const original = {
    Bucket: "wooahan-agile",
    Delete: {
      Objects: objectKeys,
      Quiet: false,
    },
  };
  // const resizeImage = {
  //   Bucket: "resize-wooahan-agile",
  //   Delete: {
  //     Objects: objectKeys,
  //     Quiet: false,
  //   },
  // };
  try {
    const result = await s3
      .deleteObjects(original, (err) => {
        if (err) throw err;
      })
      .promise();
    // const delResize = await s3
    //   .deleteObjects(resizeImage, (err) => {
    //     if (err) throw err;
    //   })
    //   .promise();
    return result;
  } catch (err) {
    return err;
  }
};
