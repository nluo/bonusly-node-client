var request = require('request'),
    host = 'https://bonus.ly/api/v1',
    errors = require('./lib/errors');


function BonuslyClient(token) {
    if (!token) {
        throw new Error('Bonusly Access Token must be provided! ');
    }

    this.host = host;
    this.accessToken = token;
};

BonuslyClient.prototype.getBonuses = function (callback) {

    var client = this;

    client.sendGetRequest('bonuses', null, function(error, response, body){
        if (error) {
            return callback(error);
        }
        console.log('response is ', response, 'body is ', body);
        body = JSON.parse(body);

        client.parseResponse(response, body, callback);
    });
};

BonuslyClient.prototype.giveBounus = function(receiverEmail, reason, amount, callback) {
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
        client.parseResponse(response, body, callback);
    });
};


BonuslyClient.prototype.giveBounusToUsers(users, reason, amount, callback) {
    var client = this;

};

BonuslyClient.prototype.sendPostRequest = function (method, data, callback) {
    var client = this,
    url = this.host + '/' + method + '?access_token=' + client.accessToken;

    request.post({url: url, json: true, body: data}, callback);
};


BonuslyClient.prototype.sendGetRequest = function (method, data, callback) {
    var client = this,
    url = this.host + '/' + method + '?access_token=' + client.accessToken;
    console.log('url is ', url);
    request({
        method: 'GET',
        uri: url,
    }, callback);
};

BonuslyClient.prototype.parseResponse = function(response, body, callback) {

    console.log('body is ', body, 'response is ', response.statusCode);
    if (response.statusCode == 200 && body.success == true) {
        return callback(null, body.result);
    }


    if (response.statusCode == 500) {
        return callback(new errors.Internal());
    }

    if (response.statusCode == 400) {
        return callback(new errors.Malformed());
    }

    callback(new Error('Unknown response code / error'));
};

module.exports = BonuslyClient;
