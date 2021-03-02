const CartStorage = require("./CartStorage");

class Cart {
  constructor(body) {
    this.body = body;
  }

  async product() {
    const product = this.body;
    try {
      const response = await CartStorage.existCart(product);
      return response;
    } catch (err) {
      return { success: false, msg: "값을 받아오지 못함" };
    }
  }

  async shoppingBasket() {
    const studentId = this.body;
    try {
      const response = await CartStorage.showProduct(studentId);
      return response;
    } catch (err) {
      return { success: false, msg: "select 실패" };
    }
  }

  async productList() {
    const product = this.body;
    try {
      const response = await CartStorage.removeList(product);
      return response;
    } catch (err) {
      return { success: false, msg: "삭제 실패" };
    }
  }
}

module.exports = Cart;
