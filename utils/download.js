'use strict';

const euSoccerData = require('./eu_soccer_data');

module.exports = async () => {
  await euSoccerData.saveLeagues();
  await euSoccerData.saveTeams();
  await euSoccerData.savePlayers();

  console.log('download complete...!');
};
