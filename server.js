'use strict';

require('dotenv').config();

const express = require('express');
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api/routes/routes');
const euSoccerData = require('./utils/eu_soccer_data');

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
    console.log('test');
  }, 86400000); // 1 day in ms

  // euSoccerData.saveLeagues();
  euSoccerData.saveTeams();
  // euSoccerData.savePlayers();

  console.log(`Server started on: ${port}`);
});
