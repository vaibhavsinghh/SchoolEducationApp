'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * FormCategory Schema
 */
var StudentSchema = new Schema({
    studentName: {
      type: String,
      default: '',
      trim: true,
      required: 'Name cannot be blank'
    },
    district: {
      type: Schema.ObjectId,
      ref: 'District'
    },
    school: {
      type: Schema.ObjectId,
      ref: 'School'
    },
    ethnicity : {
      type: String,
      default: '',
      trim: true,
      required: 'Ethnicty cannot be blank'
    },
    gender: {
     type: String,
     default: '',
     trim: true,
     enum: ['Male', 'Female']
   },
    city: {
     type: String,
     default: '',
     trim: true
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

mongoose.model('Student', StudentSchema);
