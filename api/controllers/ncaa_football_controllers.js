'use strict';

const NCAAFootball = require('../models/ncaa_football_models');

exports.getLeague = async (req, res) => {
  try {
    let league = await NCAAFootball.league.findOne();
    if (!league) res.sendStatus(404);
    res.send(league);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getTeams = async (req, res) => {
  try {
    let teams = await NCAAFootball.team.find();
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
    let team = await NCAAFootball.team.findOne(option);
    if (!team) res.sendStatus(404);
    res.send(team);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getPlayers = async (req, res) => {
  try {
    let players = await NCAAFootball.player.find();
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
    let player = await NCAAFootball.player.findOne(option);
    if (!player) res.sendStatus(404);
    res.send(player);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getSchedules = async (req, res) => {
  try {
    let schedules = await NCAAFootball.schedule.find();
    if (schedules.length < 1) res.sendStatus(404);
    res.send(schedules);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getOneSchedule = async (req, res) => {
  let option = req.params;
  try {
    let schedule = await NCAAFootball.schedule.findOne(option);
    if (!schedule) res.sendStatus(404);
    res.send(schedule);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
