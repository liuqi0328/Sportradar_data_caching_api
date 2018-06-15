'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NBALeagueSchema = new Schema({
  league_id: {
    type: String,
    required: true,
  },
  data: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

let NBATeamSchema = new Schema({
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

let NBAPlayerSchema = new Schema({
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

let NBAScheduleSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  data: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

exports.league = mongoose.model('NBALeague', NBALeagueSchema);
exports.team = mongoose.model('NBATeam', NBATeamSchema);
exports.player = mongoose.model('NBAPlayer', NBAPlayerSchema);
exports.schedule = mongoose.model('NBASchedule', NBAScheduleSchema);
