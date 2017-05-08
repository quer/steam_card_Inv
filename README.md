# steam card set inv


## getUsersCard.js - getInvCollection()
use this to get all steam trading card from a users, and it will group all cards by the appid of the game.  
```
inv.getInvCollection('quer_the_gamer', 1, function (data) {});
```
the first parameter is the steam user name or the steam64 id. the seckend is 1 or 2. 1 for steam name and 2 for steam64 id. last is callback.
### a example of a output
```
'518620':
   { cards:
      { '1965566064': { name: 'BallistickConcept', items: [ '4225807372' ] },
        '1965585015': { name: 'LeaveNoSurvivors', items: [ '4273909218' ] },
        '1965598018': { name: 'CoveringFire', items: [ '4226090709' ] },
        '1966380318': { name: 'Montage', items: [ '4264228727' ] },
        '1975182865': { name: 'Igotthis!', items: [ '4260540172' ] },
        '1999453608': { name: 'Disguises', items: [ '4263783971' ] },
        '2001027515': { name: 'GuntoaKnifeFight', items: [ '4225674806' ] },
        '2001173395': { name: 'TheEvolutionofStick', items: [ '4273083631' ] } } },
  '521230':
   { cards:
      { '2125472008': { name: 'Hotheaded', items: [ '4417099425' ] },
        '2125503435': { name: 'Crowny', items: [ '4402620943', '4417267705' ] },
        '2125531220': { name: 'Honeycombhero', items: [ '4421498297' ] },
        '2125599831': { name: 'Wormwood', items: [ '4388542432' ] },
        '2125615402': { name: 'Rainbowmane', items: [ '4455691562' ] } } },
```
## getUsersCard.js - checkApp()
use this to get a list of full set of a sinkel app, if the user have eny.
```
cardCollection.checkApp(730, fromUserInv, function (set) {
```
the first parameter, is the appId, we whant a hole set of. the next is the object that the ```getInvCollection``` returned, in the appId we what to lookup. last is a callback, where the set is returned, if eny.

### a example of a output
a list of assetId.
```
[ '4260992493',
  '4260992547',
  '4260992494',
  '4260995855',
  '4260995859',
  '4260995853' ],
[ '4260992551',
  '4260992548',
  '4260995876',
  '4260995856',
  '4260995861',
  '4260995854' ]
```
