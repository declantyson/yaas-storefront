var request = require('request');

exports.getAccessToken = function (callback) {
  request({
    url: 'https://api.yaas.io/hybris/oauth2/v1/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=hybris.order_read&client_id=jyBTxpg4bg8PJHlJ28F1GiNveI2rbwSt&client_secret=iTkH1MH617PyXhSw',
    json: true
  }, function (error, response, body) {
    if (error) {
      console.log(error);
    } else {
      var token = body.access_token;
      callback(token);
    }
  });
};

exports.getOrderDetails = function (orderNumber, token, callback) {
    request({
      url: 'https://api.yaas.io/hybris/order/v1/worldpay/salesorders/' + orderNumber,
      headers: {
        'Authorization': 'Bearer ' + token,
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
