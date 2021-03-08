const output = {
  findAllByNo: async (req, res) => {
    const image = req.body.path;
  },
};

const process = {
  upload: async (req, res) => {
    const image = req.file.location;
    if (image === undefined) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ url: image });
  },

  uploadImages: async (req, res) => {
    const images = req.files;
    if (images) {
      const path = images.map((img) => img.location);
      return res.status(200).json({ url: path });
    }
    return res.status(400).json({ success: false });
  },
};

module.exports = { output, process };
