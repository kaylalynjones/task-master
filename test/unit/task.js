/* jshint  expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');


describe('Task', function(){
  describe('constructor', function(){
    it('should create a new task', function(){
      var a = {name: 'Milk', due: '5/5/2015',
    });
  });

}); //last bracket
