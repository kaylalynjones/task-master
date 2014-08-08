'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');
var async = require('async');
var Priority = require('../models/priority');

var Task = function(obj){
  this.name = obj.name;
  this.due  = new Date(obj.due);
  this.photo = obj.photo;
  this.tags = obj.tags.split(',').map(function(t) {
    return t.trim();
  });
  this.priorityId = obj.priorityId;
  this.isComplete = false;
};

Object.defineProperty(Task, 'collection', {
  get:function(){
    return global.mongodb.collection('tasks');
  }
});

Task.prototype.save = function(cb){
  Task.collection.save(this, cb);
};
//---------------------------
/*Task.findAll = function(cb){
  Task.collection.find().toArray(function(err, objects){
    var tasks = objects.map(function(obj){
      return changePrototype(obj);
    });
    async.map(tasks, iterator, function(err, results){
      cb(results);
    });
  });
};*/

Task.findAll = function(cb) {
  Task.find(null, cb);
};

function iterator(task, cb){
  Priority.findById(task.priorityId, function(priority){
    task.priority = priority;
    cb(null, task);
  });
}

Task.find = function(query, cb) {
  Task.collection.find(query).toArray(function(err, objects){
    var tasks = objects.map(function(obj){
      return changePrototype(obj);
    });
    async.map(tasks, iterator, function(err, results){
      cb(results);
    });
  });
};

//------------------------------
Task.findById = function(id, cb){
    var _id = Mongo.ObjectID(id);
    Task.collection.findOne({_id: _id}, function(err, objects){
    var task = changePrototype(objects);
    cb(task);
  });
};

Task.prototype.toggle = function(cb){
    var value = !this.isComplete;
    Task.collection.update({_id:this._id}, {$set: {isComplete: value}}, cb);
};

//Private Function

function changePrototype(obj) {
  var tasks = _.create(Task.prototype, obj);
  return tasks;
}

//function getPriority(task, cb) {
  //Priority.findById(task.priorityId, cb);
//}
module.exports = Task;
