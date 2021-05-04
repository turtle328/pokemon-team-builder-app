const Team = require('../models/Team');

// get team associated with the user
const getTeams = async (req, res) => {};

const addTeam = async (req, res) => {
  const { teamName: name, filteredTeam: team } = req.body;

  // get username and id that will be associated with the team
  const { username, _id: userId } = req.user;

  // check if team with the same name already exists in the database
  const savedTeams = await Team.find({ name, userId });

  // if this document with the team name and user id exists then let the user know
  // that the team already exists and must be overwritten
  if (savedTeams.length > 0) {
    return res
      .status(202)
      .json({ message: 'A team with name name already exists.', needsOverwrite: true });
  }

  const newTeam = new Team({
    name, team, username, userId,
  });

  try {
    const savedTeam = await newTeam.save();
    console.log(savedTeam);
    res.status(201).json({ message: 'Team successfully saved!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred while saving the team.' });
  }
};

const replaceTeam = async (req, res) => {
  const { teamName: name, filteredTeam: team } = req.body;
  const { username, _id: userId } = req.user;
  const newTeam = {
    name, team, username, userId,
  };

  try {
    const replacedTeam = await Team.findOneAndReplace({ name, userId }, newTeam);
    console.log(replacedTeam);
    res.status(200).json({ message: 'Team was successfully overwritten!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred while updating the team.' });
  }
};

module.exports = {
  getTeams,
  addTeam,
  replaceTeam,
};
