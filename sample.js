var BonuslyClient = require('./'),
    client = new BonuslyClient('6337871281d538be7b8d1df3be0363b2');


client.getBonusForId('55e00da74010d88f7f000020', function(){
    console.log('the responses is ', arguments);
});
