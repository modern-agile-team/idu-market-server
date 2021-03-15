const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "woowahan-agile/board",
    acl: "public-read",
    region: "ap-northeast-2",
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
  limits: { fieldSize: 100 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    const ext = file.mimetype.split("/");
    const fileType = ext[1];
    if (
      fileType !== "jpg" ||
      fileType !== "png" ||
      fileType !== "jpeg" ||
      fileType !== "gif"
    ) {
      req.fileValidationError = "이미지 파일만 올리기 가능";
      return cb(null, false, req.fileValidationError);
    }
  },
});

const deleteImage = async (keys) => {
  const objectKeys = [];
  for (let key of keys) {
    const rest = {
      Key: key,
    };
    objectKeys.push(rest);
  }

  const params = {
    Bucket: "woowahan-agile",
    Delete: {
      Objects: objectKeys,
      Quiet: false,
    },
  };
  try {
    const result = await s3
      .deleteObjects(params, (err) => {
        if (err) throw err;
      })
      .promise();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = { upload, deleteImage };
