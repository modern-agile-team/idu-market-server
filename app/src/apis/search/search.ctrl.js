const Board = require("../../models/services/Board/Board");

const process = {
  search: async (req, res) => {
    const board = new Board(req);
    const response = await board.search();
    if (response.success) return res.status(200).json(response);
    response.msg = "알 수 없는 응답입니다. 서버 개발자에게 문의해주십시오.";
    return res.status(400).json(response);
  },
};

module.exports = {
  process,
};
