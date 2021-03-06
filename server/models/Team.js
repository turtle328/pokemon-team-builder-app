const mongoose = require('mongoose');

// A model for what a team document would look like
const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  team: [
    {
      name: { type: String },
      types: [{ type: String }],
      sprite: { type: String },
      _id: false,
    },
  ],
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;
