'use strict';

require('dotenv').config();

const express = require('express');
const port = process.env.PORT || 1337;
const masterKey = process.env.MASTER_KEY;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api/routes/routes');
const downloadAPI = require('./utils/download');
const ApiKey = require('./api/models/api_key_model');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST);

let db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'connection error:');
  process.exitCode = 1;
});

db.once('open', () => {
  console.log('connected to db: ', process.env.DB_HOST);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(async (req, res, next) => {
    console.log('Request Time: ', new Date(Date.now()).toUTCString());
    console.log('Request URL: ', req.originalUrl);
    console.log('Request Type: ', req.method);
    let apiKey = req.query.api_key;
    console.log('api key: ', apiKey);
    let requestUrl = req.originalUrl;

    console.log(requestUrl.startsWith('/api/v1/api_keys'));
    if (requestUrl.startsWith('/api/v1/api_keys')) {
      if (apiKey !== masterKey) {
        res.sendStatus(401);
      } else {
        next();
      }
    } else {
      let savedApiKeys = await ApiKey.find();
      if (!apiKey) {
        res.sendStatus(400);
      } else if (apiKey === masterKey) {
        next();
      } else if (!savedApiKeys.includes(apiKey)) {
        res.sendStatus(401);
      } else {
        next();
      }
    }
  });

  apiRoutes(app);

  app.listen(port);

  // /**
  //  * Set interval of 1 day to initiate downloading data from Sportradar APIs and
  //  * store them in local db.
  //  */
  // setInterval(() => {
  //   console.log(`download started on ${Date.now()}...!`);
  //   downloadAPI();
  // }, 86400000); // 1 day in ms

  // // Initial download for all of the data from Sportradar API
  // console.log('initial download started...!');
  // downloadAPI();

  console.log(`Server started on: ${port}`);
});
