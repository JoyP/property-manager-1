'use strict';

function Renter(name, age, gender, profession){
  this.name = name;
  this.age = parseInt(age);
  this.gender = gender;
  this.profession = profession;
  this._isEvicted = false;
  this._cash = Math.floor(Math.random() * 4901) + 100;
}

Renter.prototype.work = function(){
  switch(this.profession){
    case 'Movie Star':
      this._cash += Math.floor(Math.random() * 7001) + 3000;
      break;
    case 'Coder':
      this._cash += Math.floor(Math.random() * 6001) + 1000;
      break;
    case 'Waiter':
      this._cash += Math.floor(Math.random() * 201) + 50;
      break;
    case 'Social Worker':
      this._cash += Math.floor(Math.random() * 601) + 150;
  }
};

Renter.prototype.payRent = function(amount){
  if(this.isEvicted){return 0;}

  amount = parseInt(amount);
  this._isEvicted = this._cash < amount;

  if(!this._isEvicted){
    this._cash -= amount;
    return amount;
  }

  return 0;
};

Renter.prototype.party = function(){
  if(this.isEvicted){return;}

  var volume = Math.floor(Math.random() * 10) + 1;
  this.isEvicted = volume > 8;
};

module.exports = Renter;

