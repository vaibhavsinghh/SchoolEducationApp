'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Role Schema
 */
var RoleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    unique: 'Role already exists',
    default: '',
    trim: true, /* this is used to trim whitespaces */
    required: 'Name cannot be blank'
  },
  displayName: {
    type: String,
    default: '',
    trim: true
  },
  mysqlId: {
    type: Number
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updatedOn : {
    type: Date
  },
  updatedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Role', RoleSchema);
