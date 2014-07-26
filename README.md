## Property Manager
### Code Badges
[![Build Status](https://travis-ci.org/nss-cohort-2014-06-07/property-manager.svg?branch=master)](https://travis-ci.org/nss-cohort-2014-06-07/property-manager)
[![Coverage Status](https://coveralls.io/repos/nss-cohort-2014-06-07/property-manager/badge.png?branch=master)](https://coveralls.io/r/nss-cohort-2014-06-07/property-manager?branch=master)

### About
Property Manager is a Node.js application to be used at an apartment complex. It allows the owner to more easily manage the operations of the complex.

### Models
```
Room
name
length
width
#area
#cost
#isBedroom
```

```
Renter
name
age
gender
profession
_isEvicted
_cash
#work
#payRent
#party
```

```
Apartment
unit
renters
rooms
#area
#cost
#revenue
#isAvailable
#purge
#collectRent
#save
.collection [-]
.find
.findById
.deleteById
.area
.cost
.revenue
.tenents
```

### Features
- Object Oriented
- TDD
- Mocha
- MongoDB

### Running Tests
```bash
$ npm install
$ npm test
```

### Contributors
- [Chyld Medford](https://github.com/chyld)

### License
[MIT](LICENSE)
