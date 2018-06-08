'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let uniqid = require('uniqid');

let ApiKeySchema = new Schema({
  api_key: {
    type: String,
    default: uniqid(),
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);
