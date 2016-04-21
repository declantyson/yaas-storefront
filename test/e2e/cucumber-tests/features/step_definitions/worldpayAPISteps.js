var worldpayAPICalls = require('../../lib/worldpayAPICalls.js');
var helpers = require('../../lib/helpers.js');

module.exports = function () {
  this.Given(/^the order is stored correctly in Worldpay$/, function (callback) {
    worldpayAPICalls.getOrderDetails(Order.storedDetails.payments[0].paymentResponse, function (details) {
      var actualAmount = details.amount.toString();
      var expectedAmount = Order.total.substr(1).replace('.','');
      helpers.assertText(actualAmount, expectedAmount, callback);
    });
  });
};