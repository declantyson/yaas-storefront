var request = require('request');

exports.getOrderDetails = function (orderNumber, callback) {
  request({
    url: 'https://api.worldpay.com/v1/orders/' + orderNumber,
    headers: {
      'Authorization': 'T_S_0452b4cb-ff65-4bde-9234-17cb2a326a3a',
      'Content-Language': 'en',
      'Content-Type': 'application/json'
    },
    method: 'GET',
    json: true
  }, function (error, response, body) {
    if (error) {
      console.log(error);
    } else {
      callback(body);
    }
  });
};

