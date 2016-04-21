var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();


exports.assertText = function (actual, expected, callback) {
  actual.should.equal(expected);
  callback();
};

exports.verifyElementPresent = function (element, callback) {
  element.isPresent().should.eventually.equal(true).then(callback);
};