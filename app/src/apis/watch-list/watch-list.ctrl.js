const WatchList = require("../../models/services/WatchList/WatchList");

const output = {
  findAllByStudentId: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.findAllByStudentId();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.update();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },

  delete: async (req, res) => {
    const watchList = new WatchList(req);
    const response = await watchList.delete();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
