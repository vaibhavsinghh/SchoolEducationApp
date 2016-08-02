'use strict';
/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Form Schema
 */
var StudentFormSchema = new Schema({
  student: {
    type: Schema.ObjectId,
    ref: 'Student'
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

mongoose.model('StudentForm', StudentFormSchema);
