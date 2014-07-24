'use strict';

function Apartment(unit){
  this.unit = unit;
  this.rooms = [];
  this.renters = [];
}

Apartment.prototype.area = function(){
  var area = 0;

  for(var i = 0; i < this.rooms.length; i++){
    area += this.rooms[i].area();
  }

  return area;
};

Apartment.prototype.cost = function(){
  var cost = 0;

  for(var i = 0; i < this.rooms.length; i++){
    cost += this.rooms[i].cost();
  }

  return cost;
};

Apartment.prototype.bedrooms = function(){
  var count = 0;

  for(var i = 0; i < this.rooms.length; i++){
    count += this.rooms[i].isBedroom() ? 1 : 0;
  }

  return count;
};

Apartment.prototype.isAvailable = function(){
  return this.bedrooms() > this.renters.length;
};

Apartment.prototype.purge = function(){
  var renters = [];

  for(var i = 0; i < this.renters.length; i++){
    if(!this.renters[i]._isEvicted){
      renters.push(this.renters[i]);
    }
  }

  this.renters = renters;
};

Apartment.prototype.collectRent = function(){
  if(!this.renters.length){return 0;}

  var rent = this.cost() / this.renters.length;
  var collected = 0;

  for(var i = 0; i < this.renters.length; i++){
    collected += this.renters[i].payRent(rent);
  }

  return collected;
};

module.exports = Apartment;

