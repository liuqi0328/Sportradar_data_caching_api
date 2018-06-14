'use strict';

const rp = require('request-promise');
const fs = require('fs');
const NBA = require('../api/models/nba_models');

const sportradarBaseUrl = 'https://api.sportradar.us/nba/trial/v4/en';
const API_KEY = process.env.NBA_KEY;
