var request = require('request'),
    host = 'https://bonus.ly/api/v1',
    errors = require('./lib/errors'),
    kgo = require('kgo');

function BonuslyClient(token) {
    if (!token) {
        throw new Error('Bonusly Access Token must be provided! ');
    }

    this.host = host;
    this.accessToken = token;
};

BonuslyClient.prototype.getUsers = function (callback) {
  var client = this;
  kgo
  ({
      method: 'users',
      qs: []
  })
  ('request', ['method', 'qs'], client.sendGetRequest.bind(client))
  ('process', ['request'], client.parseResponse)
  (['process'], function(result){
      callback(null, result)
  }).on('error', function(error){
      callback(error);
  });
}

BonuslyClient.prototype.getBonuses = function(callback) {
    var client = this;
    kgo
    ({
        method: 'bonuses',
        qs: []
    })
    ('request', ['method', 'qs'], client.sendGetRequest.bind(client))
    ('process', ['request'], client.parseResponse)
    (['process'], function(result){
        callback(null, result)
    }).on('error', function(error){
        callback(error);
    });
};

BonuslyClient.prototype.getBonusForId = function(bonusId, callback) {
    var client = this;
    kgo
    ({
        method: 'bonuses/' + bonusId,
        qs: []
    })
    ('request', ['method', 'qs'], client.sendGetRequest.bind(client))
    ('process', ['request'], client.parseResponse)
    (['process'], function(result){
        callback(null, result)
    }).on('error', function(error){
        callback(error);
    });
};

BonuslyClient.prototype.giveBonus = function(receiverEmail, reason, amount, callback) {
    var client = this;
    if (!callback) {
        return callback(new Error('You must pass all the required arguemnts: receiverEmail, reason, amount and a callback'));
    }

    var data = {
        receiver_email: receiverEmail,
        amount: amount,
        reason: reason
    };

    this.sendPostRequest('bonuses', data, function(error, response, body){
        if (error) {
            return callback(error);
        }
        client.parseResponse(response, callback);
    });
};


BonuslyClient.prototype.sendPostRequest = function(method, data, callback) {
    var client = this;

    url = this.host + '/' + method + '?access_token=' + client.accessToken;

    request.post
    (
        {
            url: url,
            json: true,
            body: data
        },
        callback
    );
};


BonuslyClient.prototype.sendGetRequest = function(method, data, callback) {
    var client = this;

    data.access_token = client.accessToken;

    url = client.host + '/' + method;
    request
    (
        {
            method: 'GET',
            uri: url,
            json: true,
            qs: data
        },
        callback
    );
};

BonuslyClient.prototype.parseResponse = function(response, callback) {
    try {
        body = response.body;

        if (response.statusCode == 200 && body.success == true) {
            return callback(null, body.result);
        }

        if (response.statusCode == 500) {
            return callback(new errors.Internal());
        }

        if (response.statusCode == 400) {
            return callback(new errors.Malformed());
        }

        return callback(new Error('Unknown response code / error'));
    } catch (e) {
        return callback(e);
    }
};

module.exports = BonuslyClient;
