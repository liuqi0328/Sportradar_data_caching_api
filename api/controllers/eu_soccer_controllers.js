'use strict';

const Soccer = require('../models/soccer_models');

const errMsg = {message: 'err'};

/*
 * TODO: SET CORRECT STATUS CODES
 */

exports.getLeagues = async (req, res) => {
  try {
    let leagues = await Soccer.league.find();
    if (leagues.length < 1) res.sendStatus(404);
    res.send(leagues);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getOneLeague = async (req, res) => {
  let option = req.params;
  try {
    let league = await Soccer.league.findOne(option);
    if (!league) res.sendStatus(404);
    res.send(league);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getTeams = async (req, res) => {
  try {
    let teams = await Soccer.team.find();
    if (teams.length < 1) res.sendStatus(404);
    res.send(teams);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getOneTeam = async (req, res) => {
  let option = req.params;
  try {
    let team = await Soccer.team.findOne(option);
    if (!team) res.sendStatus(404);
    res.send(team);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getTeamSchedule = async (req, res) => {
  let option = req.params;
  try {
    let team = await Soccer.team.findOne(option);
    if (!team || !team.schedule) res.sendStatus(404);
    let teamSchedule = team.schedule;
    res.send(teamSchedule);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getTeamResults = async (req, res) => {
  let option = req.params;
  try {
    let team = await Soccer.team.findOne(option);
    if (!team || !team.results) res.sendStatus(404);
    let teamResults = team.results;
    res.send(teamResults);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getPlayers = async (req, res) => {
  try {
    let players = await Soccer.player.find();
    if (players.length < 1) res.sendStatus(404);
    res.send(players);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getOnePlayer = async (req, res) => {
  let option = req.params;
  try {
    let player = await Soccer.player.findOne(option);
    if (!player) res.sendStatus(404);
    res.send(player);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
