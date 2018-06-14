'use strict';

const rp = require('request-promise');
const fs = require('fs');
const Soccer = require('../api/models/soccer_models');

const sportradarBaseUrl = 'https://api.sportradar.us/soccer-xt3/eu/en';
const API_KEY = process.env.EU_SOCCER_KEY;
const EUSoccerDataFilePath = `${process.cwd()}/data/eu_soccer/`;

exports.saveLeagues = async () => {
  let Url = sportradarBaseUrl + '/tournaments.json?api_key=' + API_KEY;
  let options = {
    json: true,
    uri: Url,
  };
  try {
    let data = await rp(options);
    console.log(data);
    let leagues = data.tournaments;
    leagues.forEach(async (league) => {
      console.log('league input: ', league);
      let seasonUrl = sportradarBaseUrl + '/tournaments/' + league.id +
        '/seasons.json?api_key=' + API_KEY;
      let seasonsOptions = {
        json: true,
        uri: seasonUrl,
      };
      let seasonData;
      try {
        let result = await rp(seasonsOptions);
        seasonData = result.seasons;
      } catch (err) {
        console.log('league seasons api err...!');
        console.error(err.message);
        seasonData = [];
      }
      let existing = await Soccer.league.findOne({league_id: league.id});
      if (existing) {
        await existing.update({
          info: data,
          season: seasonData,
        }).exec();
        console.log('league updated...!');
      } else {
        let dbData = await Soccer.league.create({
          league_id: league.id,
          info: league,
          seasons: seasonData,
        });
        console.log('saved data: ', dbData);
      }
    });
  } catch (err) {
    console.log('league data save error...!');
    console.error(err.message);
  }
  return;
};

exports.saveTeams = async () => {
  let teamFiles = fs.readdirSync(EUSoccerDataFilePath + 'available/');
  console.log('save teams length: ', teamFiles.length);
  let teamIds = [];
  teamFiles.forEach(async (file) => {
    if (file === '.DS_Store') return;
    const docu = require(EUSoccerDataFilePath + 'available/' + file);
    let teamId = docu.teamId;
    teamIds.push(teamId);
  });
  let counter = 0;
  await startDownload('team', teamIds, counter);
  return;
};

exports.savePlayers = async () => {
  let teams = await Soccer.team.find();

  /**
   * TODO: Determine whether to check the number of data files or pass in
   *       environment variable for the number of teams.
   */
  let teamFiles = fs.readdirSync(EUSoccerDataFilePath + 'available/');
  let lengthCheck;
  if (teamFiles.includes('.DS_Store')) {
    lengthCheck = teamFiles.length - 1;
  } else {
    lengthCheck = teamFiles.length;
  }
  while (teams.length !== lengthCheck) {
    console.log('waiting for teams to be saved...');
    teams = await Soccer.team.find();
  }

  console.log('save players length: ', teams.length);
  let counter = 0;
  await startDownload('player', teams, counter);
  return;
};

/**
 * =============================================================================
 *                               HELPER FUNCTIONS
 * =============================================================================
 */

/**
 * Based on the option, send API requests sequentially to get data and store in
 * the database.
 *
 * @param {string}   option   Must be 'player' or 'team'.
 * @param {string[]} teams    When option = 'team', teams is an array of team
 *                            IDs.
 *                            When option = 'player', teams is an array of teams
 *                            from the database.
 * @param {number}   counter  Integer passed in as the index for teams/team IDs.
 */
let startDownload = async (option, teams, counter) => {
  if (counter === teams.length) {
    console.log('finished...!');
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

let getTeam = async (teamId) => {
  let Url = sportradarBaseUrl + '/teams/' + teamId +
    '/profile.json?api_key=' + API_KEY;
  let options = {
    json: true,
    uri: Url,
  };
  let data;
  try {
    data = await rp(options);
  } catch (err) {
    console.log('team data error...!');
    console.error(err.message);
    data = [];
  }

  let scheduleUrl = sportradarBaseUrl + '/teams/' + teamId +
    '/schedule.json?api_key=' + API_KEY;
  let optionsTwo = {
    json: true,
    uri: scheduleUrl,
  };
  let scheduleData;
  try {
    scheduleData = await rp(optionsTwo);
  } catch (err) {
    console.log('team schedule data error...!');
    console.error(err.message);
    scheduleData = [];
  }

  let resultUrl = sportradarBaseUrl + '/teams/' + teamId +
    '/results.json?api_key=' + API_KEY;
  let optionsThree = {
    json: true,
    uri: resultUrl,
  };
  let resultsData;
  try {
    resultsData = await rp(optionsThree);
  } catch (err) {
    console.log('team results data error...!');
    console.error(err.message);
    resultsData = [];
  }

  // let team_id = data.team.id;
  let existing = await Soccer.team.findOne({team_id: teamId}, (err, team) => {
    if (err) return console.error(err.message);
    if (team) return team;
  });

  if (existing) {
    await existing.update({
      profile: data,
      schedule: scheduleData.schedule,
      results: resultsData.results,
      last_updated: Date.now(),
    }).exec();
    console.log('team updated...!');
  } else {
    await Soccer.team.create({
      team_id: teamId,
      profile: data,
      schedule: scheduleData.schedule,
      results: resultsData.results,
    });
    console.log('team saved...!');
  }
  return;
};

let getPlayers = async (team) => {
  let players = team.profile.players;
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    console.log(player);
    let playerId = player.id;
    let Url = sportradarBaseUrl + '/players/' + playerId +
      '/profile.json?api_key=' + API_KEY;
    let options = {
      json: true,
      uri: Url,
    };
    try {
      let data = await rp(options);
      // console.log('data: ', data);
      let playerId = data.player.id;
      let existing = await Soccer.player.findOne(
        {player_id: playerId},
        (err, player) => {
          if (err) return console.error(err.message);
          if (player) return player;
        }
      );
      if (existing) {
        await existing.update({
          profile: data,
          last_updated: Date.now(),
        }).exec();
        console.log('player updated!');
      } else {
        await Soccer.player.create({
          player_id: playerId,
          profile: data,
        });
        console.log('player saved!');
      }
    } catch (err) {
      console.log('player data save error...!');
      console.error(err.message);
    }
  }
  return;
};
