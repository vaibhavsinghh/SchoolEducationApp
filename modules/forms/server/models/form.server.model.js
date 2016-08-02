'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Form Schema
 */
var FormSchema = new Schema({

  formName: {
    type: String,
    default: '',
    trim: true,
    required: 'Form Name cannot be blank'
  },
  formContent: {
    type: String,
    default: '',
    trim: true
  },
  category:{
    type: Schema.ObjectId,
    ref: 'Category'
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
  }
});

mongoose.model('Form', FormSchema);
