var yaasAPICalls = require('../../lib/yaasAPICalls.js');
var helpers = require('../../lib/helpers.js');

module.exports = function () {
  this.Given(/^the order is stored successfully in Hybris$/, function (callback) {
    yaasAPICalls.getAccessToken(function (accessToken) {
      yaasAPICalls.getOrderDetails(Order.number, accessToken, function (orderDetails) {
        Order.storedDetails = orderDetails;
        actualOrderTotal = Order.storedDetails.totalPrice.toString();
        expectedOrderTotal = Order.total.substr(1);
        helpers.assertText(actualOrderTotal, expectedOrderTotal, callback);
      });
    });
  });
};
