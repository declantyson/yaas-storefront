var storefront = require('../../lib/storefront.js');
var eC = protractor.ExpectedConditions;
Order = {};


module.exports = function () {

  this.Given(/^the user has a "([^"]*)" in their cart$/, function (product, callback) {
    browser.get('http://e2y-worldpay-green.cfapps.io/#!/ct/');
    storefront.addProductToCart(product, callback);
  });

  this.Given(/^the user has entered their shipping and billing details$/, function (table, callback) {
    personalDetails = table.hashes()[0];
    storefront.selectCheckoutAsGuest();
    storefront.submitBillingAddress(personalDetails, callback);
  });

  this.When(/^the user enters valid card details$/, function (table, callback) {
    cardDetails = table.hashes()[0];
    storefront.enterCardDetails(cardDetails, callback);
  });

  this.When(/^the user clicks Place Order$/, function (callback) {
    storefront.checkout.orderTotalElement().getText().then(function (text) {
      Order.total = text;
    });
    storefront.checkout.placeOrderButton().click();
    var buttonNotPresent = eC.not(eC.presenceOf(storefront.checkout.placeOrderButton()));
    browser.wait(buttonNotPresent, 10000);
    callback();
  });

  this.Then(/^the order confirmation page is displayed$/, function (callback) {
    storefront.verifyElementPresent(storefront.orderConfirmation.orderNumberH2(), function () {
      storefront.orderConfirmation.orderNumberH2().getText().then(function (text) {
        Order.number = text.substr(text.length - 8);
        callback();
      });
    });
  });
};