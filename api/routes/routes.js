'use strict';

const apiKey = require('../controllers/api_key_controllers');
const euSoccer = require('../controllers/eu_soccer_controllers');

const baseApiUrl = '/api/v1/';

module.exports = (app) => {
  app.route(baseApiUrl);
  app.route(baseApiUrl + 'api_keys/')
    .get(apiKey.index)
    .post(apiKey.create)
    .delete(apiKey.delete);
  app.route(baseApiUrl + 'soccer/eu/');
  app.route(baseApiUrl + 'soccer/eu/leagues/')
    .get(euSoccer.getLeagues);
  app.route(baseApiUrl + 'soccer/eu/leagues/:league_id')
    .get(euSoccer.getOneLeague);
  app.route(baseApiUrl + 'soccer/eu/teams/')
    .get(euSoccer.getTeams);
  app.route(baseApiUrl + 'soccer/eu/teams/:team_id/')
    .get(euSoccer.getOneTeam);
  app.route(baseApiUrl + 'soccer/eu/teams/:team_id/schedule/')
    .get(euSoccer.getTeamSchedule);
  app.route(baseApiUrl + 'soccer/eu/teams/:team_id/results/')
    .get(euSoccer.getTeamResults);
  app.route(baseApiUrl + 'soccer/eu/players/')
    .get(euSoccer.getPlayers);
  app.route(baseApiUrl + 'soccer/eu/players/:player_id')
    .get(euSoccer.getOnePlayer);
  app.route(baseApiUrl + 'soccer/international/');
  app.route(baseApiUrl + 'nba/');
  app.route(baseApiUrl + 'nfl/');
  app.route(baseApiUrl + 'ncaa/football/');
  app.route(baseApiUrl + 'ncaa/basketball/');
};
