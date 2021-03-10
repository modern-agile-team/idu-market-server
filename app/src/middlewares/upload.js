const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
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
});

// const deleteImage = (path) => {
//   return s3.deleteObject({
//     bucket: "woowahan-agile",
//     Key: `${path}`,
//   });
// };

module.exports = upload;
