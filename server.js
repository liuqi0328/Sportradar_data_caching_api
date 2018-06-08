'use strict';

require('dotenv').config();

const express = require('express');
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api/routes/routes');
const downloadAPI = require('./utils/download');

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

  apiRoutes(app);

  app.listen(port);

  setInterval(() => {
    console.log(`download started on ${Date.now()}...!`);
    downloadAPI();
  }, 86400000); // 1 day in ms

  // Initial download for all of the data from Sportradar API
  console.log('initial download started...!');
  downloadAPI();

  console.log(`Server started on: ${port}`);
});
