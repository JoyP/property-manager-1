/* jshint expr:true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Renter = require('../../app/models/renter');

describe('Renter', function(){
  describe('constructor', function(){
    it('should create a new Renter object', function(){
      var bob = new Renter('Bob Smith', '25', 'Male', 'Coder');

      expect(bob).to.be.instanceof(Renter);
      expect(bob.name).to.equal('Bob Smith');
      expect(bob.age).to.equal(25);
      expect(bob.gender).to.equal('Male');
      expect(bob._isEvicted).to.be.false;
      expect(bob.profession).to.equal('Coder');
      expect(bob._cash).to.be.within(100, 5000);
    });
  });

  describe('#work', function(){
    it('should increase cash for the renter', function(){
      var bob = new Renter('Bob Smith', '25', 'Male', 'Coder');
      bob._cash = 0;
      bob.work();

      expect(bob._cash).to.be.within(1000, 7000);
    });
  });

  describe('#payRent', function(){
    it('should pay the rent', function(){
      var bob = new Renter('Bob Smith', '25', 'Male', 'Coder');
      bob._cash = 1000;
      bob.payRent('750');

      expect(bob._cash).to.equal(250);
      expect(bob._isEvicted).to.be.false;
    });

    it('should NOT pay the rent - not enough money', function(){
      var bob = new Renter('Bob Smith', '25', 'Male', 'Coder');
      bob._cash = 50;
      bob.payRent('750');

      expect(bob._cash).to.equal(50);
      expect(bob._isEvicted).to.be.true;
    });
  });

  describe('#party', function(){
    it('should cause no disturbance - party on', function(){
      var bob;

      while(true){
        bob = new Renter('Bob Smith', '25', 'Male', 'Coder');
        bob.party();

        if(!bob.isEvicted){
          break;
        }
      }

      expect(bob.isEvicted).to.be.false;
    });

    it('should cause police to be called', function(){
      var bob;

      while(true){
        bob = new Renter('Bob Smith', '25', 'Male', 'Coder');
        bob.party();

        if(bob.isEvicted){
          break;
        }
      }

      expect(bob.isEvicted).to.be.true;
    });
  });
});

