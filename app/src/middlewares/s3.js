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
});

const deleteImage = (keys) => {
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

  s3.deleteObjects(params, function (err, data) {
    if (err) {
      console.log("Error data: ", err);
    } else {
      console.log(JSON.stringify(data));
      return JSON.stringify(data);
    }
  });
};

module.exports = { upload, deleteImage };
