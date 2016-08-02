'use strict';
/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Form Schema
 */
var FormAttributeSchema = new Schema({
  elementId: {
    type: String,
    default: '',
    trim: true
  },
  elementType: {
    type: String,
    default: '',
    trim: true
  },
  elementName: {
    type: String,
    default: '',
    trim: true
  },
  form: {
    type: Schema.ObjectId,
    ref: 'Form'
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

mongoose.model('FormAttribute', FormAttributeSchema);
