const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../../s3.json");

const s3 = new aws.S3();
const upload = multer(
  {
    storage: multerS3({
      s3: s3,
      bucket: "woowahan-agile",
      acl: "public-read",
      key: function (file, cb) {
        cb(null, Date.now() + "." + file.originalname.split(".").pop());
      },
    }),
  },
  "NONE"
);

const deleteImage = (path) => {
  return s3.deleteObject({
    bucket: "woowahan-agile",
    Key: `${path}`,
  });
};

module.exports = { upload, deleteImage };
