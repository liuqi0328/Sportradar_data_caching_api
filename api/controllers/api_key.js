'use strict';

const ApiKey = require('../models/api_key_model');

exports.index = async (req, res) => {
  console.log('getting all api keys...');
  let keys = await ApiKey.find();
  res.send(keys);
};

exports.create = async (req, res) => {
  console.log('creating api key...');
  let key = await ApiKey.create({});
  res.send(key);
};
