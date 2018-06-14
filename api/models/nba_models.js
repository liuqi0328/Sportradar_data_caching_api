'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

exports.team = mongoose.model('NBATeam', NBATeamSchema);
