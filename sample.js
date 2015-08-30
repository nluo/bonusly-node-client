var BonuslyClient = require('./'),
    client = new BonuslyClient('6337871281d538be7b8d1df3be0363b2');


client.getBonuses(function(){
    console.log('the responses is ', arguments);
});
