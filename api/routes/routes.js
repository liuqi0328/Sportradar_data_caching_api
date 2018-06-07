'use strict';

const euSoccer = require('../controllers/eu_soccer_controllers');

const baseApiUrl = '/api/v1/';

module.exports = (app) => {
  app.route(baseApiUrl);
  app.route(baseApiUrl + 'nba/');

  app.route(baseApiUrl + 'nfl/');

  app.route(baseApiUrl + 'soccer/eu/');
  app.route(baseApiUrl + 'soccer/eu/leagues/')
    .get(euSoccer.leagues);
  app.route(baseApiUrl + 'soccer/eu/teams/:teamId/');
  app.route(baseApiUrl + 'soccer/eu/players/');
  app.route(baseApiUrl + 'soccer/eu/players/:playerId');
  app.route(baseApiUrl + 'soccer/eu/teams/:teamId/schedule/');
  app.route(baseApiUrl + 'soccer/eu/teams/:teamId/results/');

  app.route(baseApiUrl + 'soccer/international/');

  app.route(baseApiUrl + 'ncaa/football/');

  app.route(baseApiUrl + 'ncaa/basketball/');
};