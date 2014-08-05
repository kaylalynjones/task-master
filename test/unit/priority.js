/* jshint  expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var urgent, high, low;

describe('Priority', function(){
  before(function(done){
    dbConnect('priorities-test', function(){
      done();
    });
  });
  
  beforeEach(function(done){
    Priority.collection.remove(function(){
      var a = {name:'High', color:'orangered', value: '10'};
      var b = {name:'Urgent', color:'red', value: '15'};
      var c = {name:'Low', color:'gold', value: '1'};
      high = new Priority(a);
      urgent = new Priority(b);
      low = new Priority(c);

      high.save(function(){
        urgent.save(function(){
          low.save(function(){
            done();
          });
        });
      });
    });
  });

 describe('constructor', function(){
    it('should create a priority', function(){
      var a = {name:'High', color:'orangered', value: '10'};
      var p1 = new Priority(a);

      expect(p1).to.be.instanceof(Priority);
      expect(p1.name).to.equal('High');
      expect(p1.color).to.equal('orangered');
      expect(p1.value).to.equal(10);
    });
  });

  describe('#save', function(){
    it('should save a priority to the DB', function(done){
      var d = {name: 'Medium', color:'orange', value: '5'};
      var medium = new Priority(d);
      medium.save(function(){
        expect(medium._id).to.be.instanceof(Mongo.ObjectID);
        expect(medium.name).to.be.a('string');
        expect(medium.color).to.be.a('string');
        expect(medium.value).to.equal(5);
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all the priorities in the database', function(done){
      Priority.findAll(function(priorities){
          expect(priorities).to.have.length(3);
          expect(priorities[0].name).to.equal('High');
          done();
      });
    });
  });

}); //last one
