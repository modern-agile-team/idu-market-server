const InterestProductStorage = require("./InterestProductStorage");

class Cart {
  constructor(body) {
    this.body = body;
  }

  async product() {
    const product = this.body;
    try {
      const response = await InterestProductStorage.existCart(product);
      if (response) return { success: true, msg: "장바구니에 저장" };
      return { success: false, msg: "이미 장바구니에 저장" };
    } catch (err) {
      return { success: false, msg: "boards 데이터베이스에 존재하지 않음" };
    }
  }

  async shoppingBasket() {
    const studentId = this.body;
    try {
      const response = await InterestProductStorage.showProduct(studentId);
      return response;
    } catch (err) {
      return { success: false, msg: "select 실패" };
    }
  }

  async productList() {
    const product = this.body;
    try {
      const response = await InterestProductStorage.remove(product);
      if (response) return { success: true, msg: "정상적으로 삭제" };
      return { success: false, msg: "database에 존재하지 않는다." };
    } catch (err) {
      return { success: false, msg: "삭제 실패" };
    }
  }
}

module.exports = Cart;
