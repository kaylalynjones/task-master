'use strict';

var Task = require('../models/task');

exports.init = function(req, res){
  res.render('tasks/init');
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.save(function(){
    res.redirect('/tasks');
  });
};

exports.index = function(req, res){
  Task.findAll(function(tasks){
    res.render('tasks/index', {tasks:tasks});
  });
};

