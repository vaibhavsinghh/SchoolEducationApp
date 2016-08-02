'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * FormCategory Schema
 */
var CategorySchema = new Schema({
   categoryName: {
    type: String,
    default: '',
    unique:'Name already Exist',
    trim: true,
    required: 'Name cannot be blank'
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
  district: {
    type: Schema.ObjectId,
    ref: 'District'
  }
});

mongoose.model('Category', CategorySchema);
