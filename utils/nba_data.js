'use strict';

const rp = require('request-promise');
const NBA = require('../api/models/nba_models');

const sportradarBaseUrl = 'https://api.sportradar.us/nba/trial/v4/en';
const API_KEY = process.env.NBA_KEY;

exports.saveLeagues = async () => {
  let options = {
    json: true,
    uri: sportradarBaseUrl + `/league/hierarchy.json?api_key=${API_KEY}`,
  };
  console.log(options);
  let league;
  try {
    league = await rp(options);
    let leagueId = league.league.id;
    let existing = await NBA.league.findOne();
    if (existing) {
      await existing.update({
        data: league,
        last_updated: Date.now(),
      }).exec();
      console.log('nba league updated...!');
    } else {
      let newData = await NBA.league.create({
        league_id: leagueId,
        data: league,
      });
      console.log('nba league saved...!', newData);
    }
  } catch (error) {
    console.log('get nba league data error...!');
    console.error(error);
  }
  return;
};

exports.saveTeams = async () => {
  let league = await NBA.league.findOne();
  while (!league) {
    console.log('waiting for nba league data to download...');
    league = await NBA.league.findOne();
  }
  console.log(league);
  let conferences = league.data.conferences;
  let eastConf = conferences[0];
  let westConf = conferences[1];
  let teams = [];
  eastConf.divisions.forEach((division) => {
    division.teams.forEach((team) => {
      teams.push(team);
    });
  });
  westConf.divisions.forEach((division) => {
    division.teams.forEach((team) => {
      teams.push(team);
    });
  });
  console.log(teams, teams.length);
  let counter = 0;
  await startDownload('team', teams, counter);
  return;
};

exports.savePlayers = async () => {
  let teams = await NBA.team.find();
  console.log(teams, teams.length);
  while (teams.length < 30) {
    console.log('waiting for nba teams...');
    teams = await NBA.team.find();
  }
  let counter = 0;
  await startDownload('player', teams, counter);
  return;
};

exports.saveSchedule = async () => {
  let year = '2017'; // Year in 4 digit format (YYYY).
  let season = 'REG'; // Preseason (PRE), Regular Season (REG), or Postseason (PST).
  let option = {
    json: true,
    uri: sportradarBaseUrl +
      `/games/${year}/${season}/schedule.json?api_key=${API_KEY}`,
  };
  let schedule;
  try {
    schedule = await rp(option);
    let existing = await NBA.schedule.findOne({year: year, season: season});
    if (existing) {
      await existing.update({
        data: schedule,
        last_updated: Date.now(),
      });
      console.log('nba schedule updated...!');
    } else {
      await NBA.schedule.create({
        year: year,
        season: season,
        data: schedule,
      });
      console.log('nba schedule created...!');
    }
  } catch (error) {
    console.log('nba schedule api error...!');
    console.error(error);
  }
  return;
};

/*
 * =============================================================================
 *                               HELPER FUNCTIONS
 * =============================================================================
 */

let startDownload = async (option, teams, counter) => {
  if (counter === teams.length) {
    console.log('nba finished...!');
    return;
  }
  let team = teams[counter];
  switch (option) {
    case 'team': {
      await getTeam(team);
      counter += 1;
      console.log(counter);
      startDownload('team', teams, counter);
      break;
    }
    case 'player': {
      await getPlayers(team);
      counter += 1;
      console.log(counter);
      startDownload('player', teams, counter);
      break;
    }
  }
};

let getTeam = async (team) => {
  let teamData;
  try {
    let options = {
      json: true,
      uri: sportradarBaseUrl +
        `/teams/${team.id}/profile.json?api_key=${API_KEY}`,
    };
    teamData = await rp(options);
  } catch (error) {
    console.log('nba team profile error...!');
    console.error(error.message);
    teamData = {};
  }

  let existing = await NBA.team.findOne({team_id: teamData.id});
  if (existing) {
    await existing.update({
      profile: teamData,
      last_updated: Date.now(),
    });
    console.log('nba team updated...!');
  } else {
    if (teamData.id) {
      await NBA.team.create({
        team_id: teamData.id,
        profile: teamData,
      });
      console.log('nba team created...!');
    } else {
      console.log('requires team id from api...!');
      console.log('error team: ', team);
      console.log('api data: ', teamData);
    }
  }
};

let getPlayers = async (team) => {
  let players = team.profile.players;
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let playerId = player.id;
    let options = {
      json: true,
      uri: sportradarBaseUrl +
        `/players/${playerId}/profile.json?api_key=${API_KEY}`,
    };
    let playerData;
    try {
      playerData = await rp(options);
    } catch (err) {
      console.log('player profile api err...!');
      console.log(playerId, player.full_name);
      console.error(err.message);
      playerData = {};
    }
    let existing = await NBA.player.findOne({player_id: playerId});
    if (existing) {
      await existing.update({
        profile: playerData,
        last_updated: Date.now(),
      }).exec();
      console.log('nba player updated...!');
    } else {
      await NBA.player.create({
        player_id: playerId,
        profile: playerData,
      });
      console.log('nba player created...!');
    }
  }
  return;
};
