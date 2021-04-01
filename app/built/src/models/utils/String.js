var String = /** @class */ (function () {
    function String() {
    }
    String.makePrice = function (price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return String;
}());
module.exports = String;
