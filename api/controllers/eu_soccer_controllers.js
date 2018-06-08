'use strict';

const Soccer = require('../models/soccer_models');

const errMsg = {message: 'err'};

exports.getLeagues = async (req, res) => {
  console.log('get leagues...');
  let leagues = await Soccer.league.find();
  res.send(leagues);
};

exports.getOneLeague = async (req, res) => {
  let option = req.body;
  let league = await Soccer.league.findOne(option, (err, league) => {
    if (err) res.send(errMsg);
    return league;
  });
  if (!league) res.send({message: 'Not found.'});
  res.send(league);
};
