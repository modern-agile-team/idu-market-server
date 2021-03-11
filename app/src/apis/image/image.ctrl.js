const Image = require("../../models/services/Image/Image");
const s3 = require("../../middlewares/s3");

const output = {
  findOneByNum: async (req, res) => {
    const board = req.body;
    const image = new Image(board);
    const response = await image.findOneByNum();
    if (response) return res.status(200).json(response);
    return res.status(400).json(response);
  },
};

const process = {
  upload: async (req, res) => {
    if (req.fileValidationError)
      return res
        .status(400)
        .json({ success: false, msg: req.fileValidationError });

    const images = req.files;
    try {
      const path = images.map((img) => img.location);
      return res.status(200).json({ success: true, url: path });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  },

  delete: async (req, res) => {
    const rest = req.body.url;
    if (rest.length) {
      const keys = [];
      rest.forEach((img) => {
        const cutUrl = img.split("/");
        const length = cutUrl.length;
        const key = `${cutUrl[length - 2]}/${cutUrl[length - 1]}`;
        keys.push(key);
      });

      const response = await s3.deleteImage(keys);
      if (response) return res.status(200).json({ success: true });
      return res.status(400).json({ success: false, msg: "s3 접근 오류" });
    }
    return res.status(400).json({ success: false, msg: "사진이 없다." });
  },
};

module.exports = { output, process };
