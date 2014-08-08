'use strict';

var Task = require('../models/task');
var moment = require('moment');
var Priority = require('../models/priority');

exports.init = function(req, res){
  Priority.findAll(function(priorities){
    res.render('tasks/init', {priorities:priorities});
  });
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.save(function(){
    res.redirect('/tasks');
  });
};

exports.index = function(req, res){
  var query = null;

  if (req.query.tag) {
    query = { tags: { $in: [ req.query.tag ] } };
  }
  Task.find(query, function(tasks){
    Priority.findAll(function(priorities){
      res.render('tasks/index', {tasks:tasks, moment:moment, priorities:priorities});
    });
  });
};

exports.toggle = function(req, res){
  Task.findById(req.params.id, function(task){
    task.toggle(function(){
      res.redirect('/tasks');
    });
  });
};

