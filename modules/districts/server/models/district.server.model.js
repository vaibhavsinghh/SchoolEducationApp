'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');   
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');   
/**
 * District Schema
 */
var DistrictSchema = new Schema({
  districtName: {
    type: String,
    unique: 'district already exists',
    default: '',
    required: 'Please fill District name',
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
    type: Date,
    default: Date.now
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
DistrictSchema.plugin(timestamps);
mongoose.model('District', DistrictSchema);
