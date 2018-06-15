'use strict';

const apiKey = require('../controllers/api_key_controllers');
const euSoccer = require('../controllers/eu_soccer_controllers');
const NBA = require('../controllers/nba_controllers');

const baseApiUrl = '/api/v1/';

module.exports = (app) => {
  // app.route(baseApiUrl);

  // API KEYS ROUTES
  app.route(baseApiUrl + 'api_keys')
    .get(apiKey.index)
    .post(apiKey.create)
    .delete(apiKey.delete);

  // EU SOCCER ROUTES
  app.route(baseApiUrl + 'soccer/eu');
  app.route(baseApiUrl + 'soccer/eu/leagues')
    .get(euSoccer.getLeagues);
  app.route(baseApiUrl + 'soccer/eu/leagues/:league_id')
    .get(euSoccer.getOneLeague);
  app.route(baseApiUrl + 'soccer/eu/teams/')
    .get(euSoccer.getTeams);
  app.route(baseApiUrl + 'soccer/eu/teams/:team_id')
    .get(euSoccer.getOneTeam);
  app.route(baseApiUrl + 'soccer/eu/teams/:team_id/schedule')
    .get(euSoccer.getTeamSchedule);
  app.route(baseApiUrl + 'soccer/eu/teams/:team_id/results')
    .get(euSoccer.getTeamResults);
  app.route(baseApiUrl + 'soccer/eu/players/')
    .get(euSoccer.getPlayers);
  app.route(baseApiUrl + 'soccer/eu/players/:player_id')
    .get(euSoccer.getOnePlayer);

  // INTL SOOCER ROUTES
  app.route(baseApiUrl + 'soccer/international');

  // NBA ROUTES
  app.route(baseApiUrl + 'nba/');
  app.route(baseApiUrl + 'nba/league')
    .get(NBA.getLeague);
  app.route(baseApiUrl + 'nba/teams')
    .get(NBA.getTeams);
  app.route(baseApiUrl + 'nba/teams/:team_id')
    .get(NBA.getOneTeam);
  app.route(baseApiUrl + 'nba/players')
    .get(NBA.getPlayers);
  app.route(baseApiUrl + 'nba/players/:player_id')
    .get(NBA.getOnePlayer);

  // NFL ROUTES
  app.route(baseApiUrl + 'nfl/');

  // NCAA FOOTBALL ROUTES
  app.route(baseApiUrl + 'ncaa/football');

  // NCAA BASKETBALL ROUTES
  app.route(baseApiUrl + 'ncaa/basketball');
};
