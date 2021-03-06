## What

A node client that consumes the Bonusly API to (currently support) retrieve/send bonuses

## Quick Reference

#### Installation
```javascript
  npm i --save bonusly-client
```

#### Use it

```javascript
var BonuslyClient = require('bonusly-client'),
    client = new BonuslyClient('Your Access Token');
```


#### Retrive bonuses:

To retrieve all the bonuses, you simply call the getBonuses method with callback:

```javascript
client.getBonuses(function(error, results) {
    if (error) {
      console.log('some error occurs: ', error);
    }
    console.log('The list of bonuses are', results);
});

```

#### Retrieve a specific bonus

 To get a specific bonus detail call the getBonus function with the bonusID:

 API
 ```javascript
 client.getBonus(bonusId, callback);
 ```

Example:

```javascript
client.getBonus('55a3555f6c8277476500000c', function(error, result){
    ...
});
```

#### Give Bonus to someone

API:
```javascript
client.giveBonus(receiverEmail, reason, amount, callback);
```
To create a bonus for someone, you would need to pass the receiverEmail, reason and the amount of the bonus:

Example:

```javascript
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
