const ImageStorage = require("./ImageStorage");

class Image {
  constructor(body) {
    this.body = body;
  }

  async findOneByNum() {
    const client = this.body;
    try {
      const response = await ImageStorage.findOneByNum(client.boardNum);
      return response;
    } catch {
      return { success: false };
    }
  }
}

module.exports = Image;
