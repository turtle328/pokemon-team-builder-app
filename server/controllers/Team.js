const Team = require('../models/Team');

// get team associated with the user
const getTeams = async (req, res) => {
  let { username } = req.params;
  if (!username) {
    // if username is undefined, grab the username from the session
    username = req.user.username;
  }

  const teams = await Team.find({ username }, { name: 1, team: 1, _id: 0 }).lean();
  const teamLen = teams.length;

  if (teamLen <= 0) {
    return res.status(200).json({ message: `No teams were found for ${username}` });
  }

  const message = teamLen === 1
    ? `1 team was found for ${username}`
    : `${teamLen} teams were found for ${username}`;

  return res.status(200).json({ teams, message });
};

// this is a post request to add a team to the server
const addTeam = async (req, res) => {
  const { name, team } = req.body;

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
    name,
    team,
    username,
    userId,
  });

  try {
    const savedTeam = await newTeam.save();
    console.log(savedTeam);
    return res.status(201).json({ message: 'Team successfully saved!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'An error occurred while saving the team.' });
  }
};

// this gets called by a put request to the /team endpoint
const replaceTeam = async (req, res) => {
  const { name, team } = req.body;
  const { username, _id: userId } = req.user;
  const newTeam = {
    name,
    team,
    username,
    userId,
  };

  try {
    const replacedTeam = await Team.findOneAndReplace({ name, userId }, newTeam, { new: true });
    console.log(replacedTeam);
    res.status(200).json({ message: 'Team was successfully overwritten!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred while updating the team.' });
  }
};

// delete's a team of a given username and their team name
const deleteTeam = async (req, res) => {
  const { name, username } = req.params;

  if (!name || !username) {
    res.status(400).json({ message: 'Bad request, missing name or username.' });
  }

  try {
    const query = await Team.deleteOne({ name, username });
    if (query.deletedCount === 1) {
      res.status(200).json({ message: 'Team was successfully deleted.' });
    } else {
      res.status(400).json({ message: 'The team is already deleted.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  getTeams,
  addTeam,
  replaceTeam,
  deleteTeam,
};
