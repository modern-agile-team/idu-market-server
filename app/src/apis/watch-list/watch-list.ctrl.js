const WatchList = require("../../models/services/WatchList/WatchList");

const output = {
  findAllById: async (req, res) => {
    const student = new WatchList(req.body.studentId);
    const response = await student.findAllById();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

const process = {
  update: async (req, res) => {
    const watchList = new WatchList(req.body);
    const response = await watchList.update();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },

  delete: async (req, res) => {
    const remove = new WatchList(req.body);
    const response = await remove.productList();
    if (response.success) return res.status(200).json(response);
    return res.status(409).json(response);
  },
};

module.exports = { output, process };
