'use strict';

const rp = require('request-promise');
const NFL = require('../api/models/nfl_models');

const sportradarBaseUrl = 'https://api.sportradar.us/nfl-ot2';
const API_KEY = process.env.NFL_KEY;

exports. saveLeagues = async () => {
  let options = {
    json: true,
    uri: sportradarBaseUrl + `/league/hierarchy.json?api_key=${API_KEY}`,
  };
  let leagueData;
  try {
    leagueData = await rp(options);
    let leagueId = leagueData.league.id;
    let existing = await NFL.league.findOne();
    if (existing) {
      await existing.update({
        data: leagueData,
        last_updated: Date.now(),
      }).exec();
      console.log('nfl league updated...!');
    } else {
      await NFL.league.create({
        league_id: leagueId,
        data: leagueData,
      });
      console.log('nfl league saved...!');
    }
  } catch (err) {
    console.log('nfl league data error...!');
    console.error(err);
  }
  return;
};

exports.saveTeams = async () => {
  let league = await NFL.league.findOne();
  while (!league) {
    console.log('waiting for nfl league data to download...');
    league = await NFL.league.findOne();
  }
  let conferences = league.data.conferences;
  let teams = [];
  conferences.forEach((conference) => {
    conference.divisions.forEach((division) => {
      division.teams.forEach((team) => {
        teams.push(team);
      });
    });
  });
  console.log('teams: ', teams, teams.length);
  let counter = 0;
  await startDownload('team', teams, counter);
  return;
};

exports.savePlayers = async () => {
  let teams = await NFL.team.find();
  while (teams.length < 32) {
    console.log('waiting for nfl teams download...');
    teams = await NFL.team.find();
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
    let existing = await NFL.schedule.findOne({ year: year, season: season });
    if (existing) {
      await existing.update({
        data: schedule,
        last_updated: Date.now(),
      });
      console.log('nfl schedule updated...!');
    } else {
      await NFL.schedule.create({
        year: year,
        season: season,
        data: schedule,
      });
      console.log('nfl schedule created...!');
    }
  } catch (error) {
    console.log('nfl schedule api error...!');
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
  } catch (err) {
    console.log('nfl team profile error...!');
    console.error(err);
    teamData = {};
  }

  let existing = await NFL.team.findOne({team_id: teamData.id});
  if (existing) {
    await existing.update({
      profile: teamData,
      last_updated: Date.now(),
    });
    console.log(`nfl team ${teamData.name} updated...!`);
  } else {
    if (teamData.id) {
      await NFL.team.create({
        team_id: teamData.id,
        profile: teamData,
      });
      console.log(`nfl team ${teamData.name} created...!`);
    } else {
      console.log('required team id from api...!');
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
      console.log('player: ', playerId, player.name);
      console.error(err.message);
    }
    let existing = await NFL.player.findOne({player_id: playerId});
    if (existing) {
      await existing.update({
        profile: playerData,
        last_updated: Date.now(),
      }).exec();
      console.log('nfl player updated...!');
    } else {
      await NFL.player.create({
        player_id: playerId,
        profile: playerData,
      });
      console.log('nfl player created...!');
    }
  }
  return;
};
