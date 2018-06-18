'use strict';

const euSoccerData = require('./eu_soccer_data');
const NBAData = require('./nba_data');
const NFLData = require('./nfl_data');
const NCAAFootballData = require('./ncaa_football_data');

module.exports = async () => {
  // EU SOCCER API DATA DOWNLOAD
  await euSoccerData.saveLeagues();
  await euSoccerData.saveTeams();
  await euSoccerData.savePlayers();

  // NBA API DATA DOWNLOAD
  await NBAData.saveLeagues();
  await NBAData.saveTeams();
  await NBAData.savePlayers();
  await NBAData.saveSchedule();

  // NFL API DATA DOWNLOAD
  await NFLData.saveLeagues();
  await NFLData.saveTeams();
  await NFLData.savePlayers();
  await NFLData.saveSchedule();

  // NCAA FOOTBALL API DATA DOWNLOAD
  await NCAAFootballData.saveLeagues();
  await NCAAFootballData.saveTeams();
  await NCAAFootballData.saveSchedule();

  console.log('download complete...!');
};
