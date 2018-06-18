'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NCAAFootballLeagueSchema = new Schema({
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

let NCAAFootballTeamSchema = new Schema({
  team_id: {
    type: String,
    required: true,
  },
  profile: Schema.Types.Mixed,
  roster: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

let NCAAFootballScheduleSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  weeks: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

exports.league = mongoose.model('NCAAFootballLeague', NCAAFootballLeagueSchema);
exports.team = mongoose.model('NCAAFootballTeam', NCAAFootballTeamSchema);
exports.schedule = mongoose.model('NCAAFootballSchedule',
                                  NCAAFootballScheduleSchema);
