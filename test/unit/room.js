/* jshint expr:true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Room = require('../../app/models/room');

describe('Room', function(){
  describe('constructor', function(){
    it('should create a new Room object', function(){
      var lr = new Room('Living', '25', '10');

      expect(lr).to.be.instanceof(Room);
      expect(lr.name).to.equal('Living');
      expect(lr.length).to.equal(25);
      expect(lr.width).to.equal(10);
    });
  });

  describe('#area', function(){
    it('should compute the area of the room', function(){
      var lr = new Room('Living', '25', '10');

      expect(lr.area()).to.equal(250);
    });
  });

  describe('#cost', function(){
    it('should compute the cost of the room', function(){
      var lr = new Room('Living', '25', '10');

      expect(lr.cost()).to.equal(1250);
    });
  });
});

