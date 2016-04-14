var storefront = require('../../lib/storefront.js');

var steps = function (callback) {

  this.Given(/^the user has a "([^"]*)" in their cart$/, function (product, callback) {
    browser.get('http://localhost:9000/#!/ct/');
    // browser.get('http://e2y-worldpay-green.cfapps.io/#!/ct/');
    storefront.addProductToCart(product);
    browser.sleep().then(callback);
  });

  this.Given(/^the user has entered their shipping and billing details$/, function (table, callback) {
    personalDetails = table.hashes()[0];
    storefront.selectCheckoutAsGuest();
    storefront.submitBillingAddress(personalDetails); //this might need to be a promise for the .then(callback) to work
    browser.sleep().then(callback);
  });

  this.When(/^the user enters valid card details$/, function (table, callback) {
    cardDetails = table.hashes()[0];
    storefront.enterCardDetails(cardDetails);
    browser.sleep().then(callback);
  });

  this.When(/^the user clicks Place Order$/, function (callback) {
    storefront.checkout.placeOrderButton().click();
    browser.sleep().then(callback);
  });

  this.Then(/^the order confirmation page is displayed$/, function (callback) {
    storefront.verifyElementPresent(callback, storefront.orderConfirmation.orderNumberH2());
  });
};

module.exports = steps;
