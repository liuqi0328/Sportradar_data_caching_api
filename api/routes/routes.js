'use strict';

const apiKey = require('../controllers/api_key_controllers');
const euSoccer = require('../controllers/eu_soccer_controllers');
const NBA = require('../controllers/nba_controllers');
const NFL = require('../controllers/nfl_controllers');
const NCAAFootball = require('../controllers/ncaa_football_controllers');

const baseApiUrl = '/api/v1/';

module.exports = (app) => {
  // API KEYS ROUTES
  app.route(baseApiUrl + 'api_keys')
    .get(apiKey.index)
    .post(apiKey.create)
    .delete(apiKey.delete);

  // EU SOCCER ROUTES
  app.route(baseApiUrl + 'soccer/eu');
  app.get(baseApiUrl + 'soccer/eu/leagues', euSoccer.getLeagues);
  app.get(baseApiUrl + 'soccer/eu/leagues/:league_id', euSoccer.getOneLeague);
  app.get(baseApiUrl + 'soccer/eu/teams/', euSoccer.getTeams);
  app.get(baseApiUrl + 'soccer/eu/teams/:team_id', euSoccer.getOneTeam);
  app.get(baseApiUrl + 'soccer/eu/teams/:team_id/schedule',
          euSoccer.getTeamSchedule);
  app.get(baseApiUrl + 'soccer/eu/teams/:team_id/results',
          euSoccer.getTeamResults);
  app.get(baseApiUrl + 'soccer/eu/players/', euSoccer.getPlayers);
  app.get(baseApiUrl + 'soccer/eu/players/:player_id', euSoccer.getOnePlayer);

  // INTL SOOCER ROUTES
  app.route(baseApiUrl + 'soccer/international');

  // NBA ROUTES
  app.route(baseApiUrl + 'nba/');
  app.get(baseApiUrl + 'nba/league', NBA.getLeague);
  app.get(baseApiUrl + 'nba/teams', NBA.getTeams);
  app.get(baseApiUrl + 'nba/teams/:team_id', NBA.getOneTeam);
  app.get(baseApiUrl + 'nba/players', NBA.getPlayers);
  app.get(baseApiUrl + 'nba/players/:player_id', NBA.getOnePlayer);
  app.get(baseApiUrl + 'nba/schedule', NBA.getSchedules);
  // app.get(baseApiUrl + 'nba/schedule/:year', NBA.getOneSchedule);
  app.get(baseApiUrl + 'nba/schedule/:year/seasons/:season',
          NBA.getOneSchedule);

  // NFL ROUTES
  app.route(baseApiUrl + 'nfl/');
  app.get(baseApiUrl + 'nfl/league', NFL.getLeague);
  app.get(baseApiUrl + 'nfl/teams', NFL.getTeams);
  app.get(baseApiUrl + 'nfl/teams/:team_id', NFL.getOneTeam);
  app.get(baseApiUrl + 'nfl/players', NFL.getPlayers);
  app.get(baseApiUrl + 'nfl/players/:player_id', NFL.getOnePlayer);
  app.get(baseApiUrl + 'nfl/schedule', NFL.getSchedules);
  // app.get(baseApiUrl + 'nfl/schedule/:year', NFL.getOneSchedule);
  app.get(baseApiUrl + 'nfl/schedule/:year/seasons/:season',
          NFL.getOneSchedule);

  // NCAA FOOTBALL ROUTES
  app.route(baseApiUrl + 'ncaa/football');
  app.get(baseApiUrl + 'ncaa/football/league', NCAAFootball.getLeague);
  app.get(baseApiUrl + 'ncaa/football/teams', NCAAFootball.getTeams);
  app.get(baseApiUrl + 'ncaa/football/teams/:team_id', NCAAFootball.getOneTeam);
  app.get(baseApiUrl + 'ncaa/football/players', NCAAFootball.getPlayers);
  app.get(baseApiUrl + 'ncaa/football/players/:player_id',
          NCAAFootball.getOnePlayer);
  app.get(baseApiUrl + 'ncaa/football/schedule', NCAAFootball.getSchedules);
  // app.get(baseApiUrl + 'ncaa/football/schedule/:year', NCAAFootball.getOneSchedule);
  app.get(baseApiUrl + 'ncaa/football/schedule/:year/seasons/:season',
          NCAAFootball.getOneSchedule);

  // NCAA BASKETBALL ROUTES
  app.route(baseApiUrl + 'ncaa/basketball');
};
