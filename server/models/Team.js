const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
  },
  team: [
    {
      name: { type: String },
      types: [{ type: String }],
      sprite: { type: String },
    },
  ],
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

const TeamModel = new mongoose.model('Team', TeamSchema);

module.exports = TeamModel;
