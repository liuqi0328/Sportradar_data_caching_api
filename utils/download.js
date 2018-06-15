'use strict';

const euSoccerData = require('./eu_soccer_data');
const NBAData = require('./nba_data');

module.exports = async () => {
  // // EU SOCCER API DATA DOWNLOAD
  // await euSoccerData.saveLeagues();
  // await euSoccerData.saveTeams();
  // await euSoccerData.savePlayers();

  // // NBA API DATA DOWNLOAD
  // await NBAData.saveLeagues();
  // await NBAData.saveTeams();
  // await NBAData.savePlayers();
  await NBAData.saveSchedule();

  console.log('download complete...!');
};
