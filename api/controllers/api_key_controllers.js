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

exports.delete = async (req, res) => {
  console.log('delete api key...');
  console.log('delete api key queries: ', req.query);

  let params = req.query;
  if (params) {
    let apiKey = await ApiKey.findOneAndRemove(params, (error, key) => {
      if (error) {
        console.error(error);
        return error.message;
      }
      return key;
    });
    res.send(apiKey);
  } else {
    res.sendStatus(404);
  }
};
