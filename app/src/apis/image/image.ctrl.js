const Image = require("../../models/services/image/Image");

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
    const images = req.files;
    if (images) {
      const path = images.map((img) => img.location);
      return res.status(200).json({ url: path });
    }
    return res.status(400).json({ success: false });
  },
};

module.exports = { output, process };
