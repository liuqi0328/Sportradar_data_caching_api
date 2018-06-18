'use strict';

const rp = require('request-promise');
const NCAAFootball = require('../api/models/ncaa_football_models');

const sportradarBaseUrl = `https://api.sportradar.us/ncaafb-t1`;
const API_KEY = process.env.NCAA_FOOTBALL_KEY;

exports.saveLeagues = async () => {
  let options = {
    json: true,
    uri: sportradarBaseUrl + `/teams/FBS/hierarchy.json?api_key=${API_KEY}`,
  };
  let leagueData;
  try {
    leagueData = await rp(options);
    let leagueId = 'FBS';
    let existing = await NCAAFootball.league.findOne();
    if (existing) {
      await existing.update({
        data: leagueData,
        last_updated: Date.now(),
      }).exec();
      console.log('ncaa football league updated...!');
    } else {
      await NCAAFootball.league.create({
        league_id: leagueId,
        data: leagueData,
      });
      console.log('ncaa football league created...!');
    }
  } catch (err) {
    console.log('ncaa football league api error...!');
    console.error(err);
  }
  return;
};

exports.saveTeams = async () => {
  let league = await NCAAFootball.league.findOne();
  while (!league) {
    console.log('waiting for ncaa football league data to download...');
    league = await NCAAFootball.league.findOne();
  }
  let conferences = league.data.conferences;
  let teams = [];
  conferences.forEach((conference) => {
    let subdivisions = conference.subdivisions;
    if (subdivisions) {
      subdivisions.forEach((subdivision) => {
        subdivision.teams.forEach((team) => {
          teams.push(team);
        });
      });
    } else {
      conference.teams.forEach((team) => {
        teams.push(team);
      });
    }
  });
  console.log('teams: ', teams, teams.length);
  teams.forEach(async (team) => {
    let teamId = team.id;
    let existing = await NCAAFootball.team.findOne({team_id: teamId});
    if (existing) {
      await existing.update({
        profile: team,
        last_updated: Date.now(),
      }).exec();
      console.log('ncaa football team profile updated...!');
    } else {
      await NCAAFootball.team.create({
        team_id: teamId,
        profile: team,
      });
      console.log('ncaa football team profile created...!');
    }
  });

  let savedTeams = await NCAAFootball.team.find();
  while (savedTeams.length < 130) {
    console.log('waiting for ncaa football teams...');
    savedTeams = await NCAAFootball.team.find();
  }
  let counter = 0;
  await startDownload('team', teams, counter);
  return;
};

exports.saveSchedule = async () => {
  let year = '2017'; // Year in 4 digit format (YYYY).
  let season = 'REG'; // Preseason (PRE), Regular Season (REG), or Postseason (PST).
  let scheduleData;
  let weeks;
  try {
    let options = {
      json: true,
      uri: sportradarBaseUrl +
        `/${year}/${season}/schedule.json?api_key=${API_KEY}`,
    };
    scheduleData = await rp(options);
    weeks = scheduleData.weeks;
  } catch (err) {
    console.log('ncaa football schedule api error...!');
    console.error(err);
    weeks = [];
  }
  let existing = await NCAAFootball.schedule.findOne({year: year,
                                                      season: season});
  if (existing) {
    await existing.update({
      weeks: weeks,
      last_updated: Date.now(),
    }).exec();
    console.log('ncaa football schedule updated...!');
  } else {
    await NCAAFootball.schedule.create({
      year: year,
      season: season,
      weeks: weeks,
    });
    console.log('ncaa football schedule created...!');
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
    console.log('ncaa finished...!');
    return;
  }
  let team = teams[counter];
  await getTeam(team);
  counter += 1;
  console.log(counter);
  startDownload('team', teams, counter);
};

let getTeam = async (team) => {
  let teamRoster;
  try {
    let options = {
      json: true,
      uri: sportradarBaseUrl +
        `/teams/${team.id}/roster.json?api_key=${API_KEY}`,
    };
    teamRoster = await rp(options);
  } catch (err) {
    console.log('ncaa football team roster error...!');
    console.error(err);
    teamRoster = {};
  }
  let existing = await NCAAFootball.team.findOne({team_id: team.id});
  while (!existing) {
    console.log('waiting for ncaa team to download team roster...');
    existing = await NCAAFootball.team.findOne({team_id: team.id});
  }
  try {
    await existing.update({
      roster: teamRoster,
      last_updated: Date.now(),
    }).exec();
    console.log('ncaa team roster updated...!');
  } catch (err) {
    console.log('ncaa team roster api error...!');
    console.log('error team: ', team.name);
    console.error(err);
  }
};
