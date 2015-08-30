# bonusly-node-client

## What
A nodejs client that consumes the Bonusly API to retrieve/send bonuses

## Quick Reference

#### Installation
```
  npm i --save bonusly-node-client
```

#### Use it

```javascript
var BonuslyClient = require('./'),
    client = new BonuslyClient('Your Access Token');
```

To retrieve all the bonuses, you simply call the getBonuses method with callback:

```
client.getBonuses(function(error, results) {
    if (error) {
      console.log('some error occurs: ', error);
    }
    console.log('The list of bonuses are', results);
});

```

To create a bonus for someone, you would need to pass the receiverEmail, reason and the amount of the bonus:

```

client.giveBounus('bob.smith@majigger.com', 'Because bob is awesome', 20, function(error, result){
  if (error) {
    console.log('oops could not send bonus to bob, error is: ', error);
  }
  console.log('Successfully give 20 bounuses points to Bob because he is awesome! ', result);
});

```

## Test

``` 
npm test
```


