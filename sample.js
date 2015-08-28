var BonuslyClient = require('./'),
    client = new BonuslyClient('6337871281d538be7b8d1df3be0363b2');


client.giveBounus('andrew.gallagher@temando.com', 'test test nodejs #mateship', 1.5, function(error, response){
    console.log('error is ', error, ' response is ', response);
});
