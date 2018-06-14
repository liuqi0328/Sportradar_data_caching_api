'use strict';

const Soccer = require('../models/soccer_models');

const errMsg = {message: 'err'};

/**
 * TODO: SET CORRECT STATUS CODES
 */

exports.getLeagues = async (req, res) => {
  console.log('get leagues...');
  let leagues = await Soccer.league.find();
  res.send(leagues);
};

exports.getOneLeague = async (req, res) => {
  console.log('req: ', req.params);
  let option = req.params;
  let league = await Soccer.league.findOne(option, (err, league) => {
    if (err) res.send(errMsg);
    return league;
  });
  if (!league) res.sendStatus(404);
  res.send(league);
};

exports.getTeams = async (req, res) => {
  console.log('get teams...');
  let teams = await Soccer.team.find();
  res.send(teams);
};

exports.getOneTeam = async (req, res) => {
  console.log('get one team...');
  let option = req.params;
  let team = await findOneTeam(option);
  if (!team) res.sendStatus(404);
  res.send(team);
};

exports.getTeamSchedule = async (req, res) => {
  console.log('get team schedule...');
  let option = req.params;
  let team = await findOneTeam(option);
  if (!team) res.sendStatus(404);
  let teamSchedule = team.schedule;
  res.send(teamSchedule);
};

exports.getTeamResults = async (req, res) => {
  console.log('get team results...');
  let option = req.params;
  let team = await findOneTeam(option);
  if (!team) res.sendStatus(404);
  let teamResults = team.results;
  res.send(teamResults);
};

exports.getPlayers = async (req, res) => {
  console.log('get all players...');
  let players = await Soccer.player.find();
  if (!players) res.sendStatus(404);
  res.send(players);
};

exports.getOnePlayer = async (req, res) => {
  console.log('get one player...');
  let option = req.params;
  let player = await Soccer.player.findOne(option, (err, data) => {
    if (err) {
      console.log('get player from db err...!');
      console.error(err.message);
      res.send(errMsg);
    }
    return data;
  });
  if (!player) res.sendStatus(404);
  res.send(player);
};

/**
 * =============================================================================
 *                              HELPER FUNCTIONS
 * =============================================================================
 */

let findOneTeam = async (option) => {
  let team = await Soccer.team.findOne(option, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    return data;
  });
  return team;
};
