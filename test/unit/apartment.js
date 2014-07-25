/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Apartment = require('../../app/models/apartment');
var Room = require('../../app/models/room');
var Renter = require('../../app/models/renter');
var connection = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var a1, a2;

describe('Apartment', function(){
  before(function(done){
    connection('property-manager-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Apartment.collection.remove(function(){
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

      a2 = new Apartment('A2');
      var b4 = new Room('Bed', 30, 25);
      var b5 = new Room('Bed', 15, 45);
      var k2 = new Room('Kitchen', 25, 15);
      a2.rooms.push(b4, b5, k2);

      a1.save(function(){
        a2.save(function(){
          done();
        });
      });
    });
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

  describe('#save', function(){
    it('should insert a new apartment into the database', function(){
      expect(a1._id).to.be.instanceof(Mongo.ObjectID);
    });

    it('should update an exiting apartment from the database', function(done){
      a1.unit = 'A1*';
      a1.save(function(){
        Apartment.findById(a1._id, function(err, apt){
          expect(apt.unit).to.equal('A1*');
          done();
        });
      });
    });
  });

  describe('.find', function(){
    it('should find all apartments', function(done){
      Apartment.find({}, function(err, apts){
        expect(apts).to.have.length(2);
        expect(apts[0]).to.respondTo('area');
        expect(apts[0].rooms[0]).to.respondTo('area');
        expect(apts[0].renters[0]).to.respondTo('work');
        done();
      });
    });

    it('should find some apartments', function(done){
      Apartment.find({unit:'A1'}, function(err, apts){
        expect(apts).to.have.length(1);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find an apartment', function(done){
      Apartment.findById(a1._id, function(err, apt){
        expect(apt.unit).to.equal('A1');
        expect(apt).to.respondTo('area');
        expect(apt.rooms[0]).to.respondTo('area');
        expect(apt.renters[0]).to.respondTo('work');
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete an apartment', function(done){
      Apartment.delteById(a1._id, function(){
        Apartment.find({}, function(err, apts){
          expect(apts).to.have.length(1);
          done();
        });
      });
    });
  });

  describe('.area', function(){
    it('should find area of apartment complex', function(done){
      Apartment.area(function(area){
        expect(area).to.equal(4475);
        done();
      });
    });
  });

  describe('.cost', function(){
    it('should find cost of apartment complex', function(done){
      Apartment.cost(function(cost){
        expect(cost).to.equal(22375);
        done();
      });
    });
  });

  describe('.revenue', function(){
    it('should find revenue of apartment complex', function(done){
      Apartment.revenue(function(revenue){
        expect(revenue).to.equal(13375);
        done();
      });
    });
  });

  describe('.tenents', function(){
    it('should find all tenents in apartment complex', function(done){
      Apartment.tenents(function(tenents){
        expect(tenents).to.equal(2);
        done();
      });
    });
  });
});

