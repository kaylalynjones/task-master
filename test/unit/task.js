/* jshint  expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var groceries, homework, gas, maintenance, laundry;

describe('Task', function(){
  before(function(done){
    dbConnect('tasks-test', function(){
      done();
    });
  });
  
  beforeEach(function(done){
    Task.collection.remove(function(){
      var a = {name:'Laundry', due:'8/25/2014', photo:'http://cdn.flaticon.com/png/256/12568.png', tags: 'home, chores, housework', priorityId:''};
      var b = {name: 'Groceries', due: '8/18/2014', photo: 'https://cdn3.iconfinder.com/data/icons/line/36/shopping_cart-256.png', tags: 'food, store, home, budget', priorityId: ''};
      var c = {name: 'Homework', due: '8/19/2014', photo: 'https://cdn3.iconfinder.com/data/icons/education/512/Book_B-128.png', tags: 'homework, code, school', priorityId: ''};
      var d = {name: 'Gas', due: '8/20/2014', photo: 'http://www.clker.com/cliparts/5/b/6/6/P/H/petrol-pump-symbol-md.png', tags: 'car, budget, home', priorityId: ''};
      var e = {name: 'Maintenance', due: '9/15/2014', photo: 'https://cdn1.iconfinder.com/data/icons/real-estate-set-2/512/21-128.png', tags: 'budget, maintenance, home, housework', priorityId: ''};
      laundry = new Task(a);
      groceries = new Task(b);
      homework = new Task(c);
      gas = new Task(d);
      maintenance = new Task(e);

      laundry.save(function(){
        groceries.save(function(){
          homework.save(function(){
            gas.save(function(){
              maintenance.save(function(){
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('constructor', function(){
    it('should create a new task', function(){
      var a = {name: 'Milk', due: '8/18/2014', photo: 'www.google.com', tags: 'food, store, home, work', priorityId: ''};
      var milk = new Task(a);
      expect(milk).to.be.instanceof(Task);
      expect(milk.name).to.equal('Milk');
      expect(milk.due).to.be.an('date');
      expect(milk.photo).to.be.equal('www.google.com');
      expect(milk.tags).to.have.length(4);
    });
  });
  
  describe('#save', function(){
    it('should save a task to the database', function(done){
      var a = {name: 'Milk', due: '8/18/2014', photo: 'www.google.com', tags: 'food, store, home, work', priorityId: ''};
      var milk = new Task(a);
        milk.save(function(){
          expect(milk._id).to.be.instanceof(Mongo.ObjectID);
          done();
        });
    });
  });

  describe('.findAll', function(){
    it('should find all the tasks in the database', function(done){
      Task.findAll(function(tasks){
          expect(tasks).to.have.length(5);
          done();
        });
      });
    });
 
  describe('.findById', function(){
    it('should find a task by the id', function(done){
      Task.findById(groceries._id.toString(), function(task){
        expect(task).to.respondTo('save');
        expect(task.name).to.equal('Groceries');
        done();
      });
    });
  });

}); //last bracket
