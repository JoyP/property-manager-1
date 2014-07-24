/* jshint expr:true */
/* global describe, it, beforeEach */

'use strict';

var expect = require('chai').expect;
var Apartment = require('../../app/models/apartment');
var Room = require('../../app/models/room');
var Renter = require('../../app/models/renter');

var a1;

describe('Apartment', function(){

  beforeEach(function(){
    a1 = new Apartment('A1');
    var b1 = new Room('Bed', 10, 20);
    var b2 = new Room('Bed', 25, 25);
    var b3 = new Room('Bed', 30, 15);
    var k1 = new Room('Kitchen', 5, 10);
    var l1 = new Room('Living', 45, 30);
    var bob = new Renter('Bob', 22, 'Male', 'Waiter');
    var amy = new Renter('Amy', 25, 'Female', 'Movie Star');
    a1.rooms.push(b1, b2, b3, k1, l1);
    a1.renters.push(bob, amy);
  });

  describe('constructor', function(){
    it('should create a new Apartment object', function(){
      var a2 = new Apartment('A2');

      expect(a2).to.be.instanceof(Apartment);
      expect(a2.unit).to.equal('A2');
      expect(a2.rooms).to.have.length(0);
      expect(a2.renters).to.have.length(0);
    });
  });

  describe('#area', function(){
    it('should compute area for an apartment', function(){
      expect(a1.area()).to.equal(2675);
    });
  });

  describe('#cost', function(){
    it('should compute cost for an apartment', function(){
      expect(a1.cost()).to.equal(13375);
    });
  });

  describe('#bedrooms', function(){
    it('should count number of bedrooms in apartment', function(){
      expect(a1.bedrooms()).to.equal(3);
    });
  });

  describe('#isAvailable', function(){
    it('should determine if there are open bedrooms in apartment', function(){
      expect(a1.isAvailable()).to.be.true;
    });

    it('should determine if there are open bedrooms in apartment - none available', function(){
      var gil = new Renter('Gil', 23, 'Female', 'Coder');
      a1.renters.push(gil);
      expect(a1.isAvailable()).to.be.false;
    });
  });

  describe('#purge', function(){
    it('should purge evicted tenents', function(){
      var gil = new Renter('Gil', 23, 'Female', 'Coder');
      gil._isEvicted = true;
      a1.renters.push(gil);

      expect(a1.renters).to.have.length(3);
      a1.purge();
      expect(a1.renters).to.have.length(2);
    });
  });

  describe('#collectRent', function(){
    it('should collect rent from tenents', function(){
      a1.renters[0]._cash = 10000;
      a1.renters[1]._cash = 7000;
      var collected = a1.collectRent();
      expect(collected).to.be.closeTo(13375, 1);

      a1.renters[0]._cash = 10000;
      a1.renters[1]._cash = 300;
      collected = a1.collectRent();
      expect(collected).to.be.closeTo(6687, 1);
      expect(a1.renters[0]._isEvicted).to.be.false;
      expect(a1.renters[1]._isEvicted).to.be.true;
    });
  });
});

