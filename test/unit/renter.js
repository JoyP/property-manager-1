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
      expect(bob.isEvicted).to.be.false;
      expect(bob.profession).to.equal('Coder');
      expect(bob.cash).to.be.within(100, 5000);
    });
  });
});

