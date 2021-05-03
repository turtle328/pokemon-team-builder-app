const Team = require('../models/Team');

const saveTeam = (req, res) => res.status(200).json({ message: 'Team successfully saved!' });

module.exports = {
  saveTeam,
};
