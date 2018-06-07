'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SoccerLeagueSchema = new Schema({
  league_id: {
    type: String,
    required: true,
  },
  info: Schema.Types.Mixed,
  seasons: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

let SoccerTeamSchema = new Schema({
  team_id: {
    type: String,
    required: true,
  },
  profile: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

let SoccerPlayerSchema = new Schema({
  player_id: {
    type: String,
    required: true,
  },
  profile: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

exports.league = mongoose.model('SoccerLeague', SoccerLeagueSchema);
exports.team = mongoose.model('SoccerTeam', SoccerTeamSchema);
exports.player = mongoose.model('SoccerPlayer', SoccerPlayerSchema);
