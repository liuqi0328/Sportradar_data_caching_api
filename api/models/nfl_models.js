'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NFLLeagueSchema = new Schema({
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

let NFLTeamSchema = new Schema({
  team_id: {
    type: String,
    required: true,
  },
  profile: Schema.Types.Mixed,
  roster: Schema.Types.Mixed,
  seasonal_stats: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

let NFLPlayerSchema = new Schema({
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

let NFLScheduleSchema = new Schema({
  year: {
   type: Number,
   required: true,
  },
  season: {
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

exports.league = mongoose.model('NFLLague', NFLLeagueSchema);
exports.team = mongoose.model('NFLTeam', NFLTeamSchema);
exports.player = mongoose.model('NFLPlayer', NFLPlayerSchema);
exports.schedule = mongoose.model('NFLSchedule', NFLScheduleSchema);
