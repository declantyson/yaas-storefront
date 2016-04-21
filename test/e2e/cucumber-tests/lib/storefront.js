var helpers = require('./helpers.js');
var eC = protractor.ExpectedConditions;


var Storefront = function () {
};

//============== Elements
Storefront.prototype.homepage = {
  productLink: function (product) {
    return element(by.xpath('//div[text()="' + product + '"]'));
  }
};

Storefront.prototype.pdp = {
  addToCartButton: function () {
    return element(by.id('buy-button'));
  }
};

Storefront.prototype.cart = {
  checkoutButton: function () {
    return element(by.xpath('//div[@class="btn-group checkout"]/button'));
  }
};

Storefront.prototype.loginRegister = {
  checkoutAsGuestButton: function () {
    return element(by.xpath('//div[@class="continue-as-guest-section ng-scope"]/a'));
  }
};

Storefront.prototype.checkout = {
  titleSelectList: function (title) {
    return element(by.id('titleAccount')).$('[label="' + title + '"]');
  },
  firstNameField: function () {
    return element(by.id('firstNameAccount'));
  },
  lastNameField: function () {
    return element(by.id('lastNameAccount'));
  },

  emailField: function () {
    return element(by.id('email'));
  },

  countrySelectList: function (country) {
    return element(by.id('countryBill')).$('[label="' + country + '"]');
  },

  addressField: function () {
    return element(by.id('address1Bill'));
  },

  cityField: function () {
    return element(by.id('cityBill'));
  },

  stateSelectList: function (state) {
    return element(by.id('stateBill')).$(('[value="' + state + '"]'));
  },

  postalCodeField: function () {
    return element(by.id('zipCodeBill'));
  },
  previewOrderButton: function () {
    return element(by.id('preview-order-btn'));
  },
  cardNumberField: function () {
    return element(by.id('ccNumber'));
  },
  monthSelectList: function (month) {
    return element(by.id('expMonth')).$(('[label="' + month + '"]'));
  },
  yearSelectList: function (year) {
    return element(by.id('expYear')).$(('[label="' + year + '"]'));
  },
  cvcField: function () {
    return element(by.id('cvc'));
  },
  orderTotalElement: function () {
    return element(by.xpath('(//td[text()="Order Total"]/../td[2])[1]'));
  },
  placeOrderButton: function () {
    return element(by.id('place-order-btn'));
  }
};


Storefront.prototype.orderConfirmation = {
  orderNumberH2: function () {
    return element(by.className('orderNumber ng-binding ng-scope'));
  }
};

//============== Actions
Storefront.prototype.addProductToCart = function (product, callback) {
  this.homepage.productLink(product).click();
  this.pdp.addToCartButton().click().then(callback);
};

Storefront.prototype.selectCheckoutAsGuest = function () {
  browser.wait(eC.presenceOf(this.cart.checkoutButton()), 10000);
  this.cart.checkoutButton().click();
  browser.wait(eC.presenceOf(this.loginRegister.checkoutAsGuestButton()), 10000);
  this.loginRegister.checkoutAsGuestButton().click();
};

Storefront.prototype.submitBillingAddress = function (details, callback) {
  this.checkout.titleSelectList('Mr.').click();
  this.checkout.firstNameField().sendKeys(details['First Name']);
  this.checkout.lastNameField().sendKeys(details['Last Name']);
  this.checkout.emailField().sendKeys(details['Email']);
  this.checkout.countrySelectList(details['Country']).click();
  this.checkout.addressField().sendKeys(details['Address']);
  this.checkout.cityField().sendKeys(details['City']);
  if (details['State'] != null) {
    this.checkout.stateSelectList(details['State']).click();
  }
  this.checkout.postalCodeField().sendKeys(details['Postal Code']);
  this.checkout.previewOrderButton().click().then(callback);
};
Storefront.prototype.enterCardDetails = function (details, callback) {
  this.checkout.cardNumberField().sendKeys(details['Card Number']);
  this.checkout.monthSelectList(details['Month']).click();
  this.checkout.yearSelectList(details['Year']).click();
  this.checkout.cvcField().sendKeys(details['CVC']).then(callback);
};

//============== Helpers
Storefront.prototype.verifyElementPresent = function (element, callback) {
  helpers.verifyElementPresent(element, callback);
};

module.exports = new Storefront();
