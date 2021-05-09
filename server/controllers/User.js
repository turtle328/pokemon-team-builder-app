const User = require('../models/User');
const Team = require('../models/Team');
const { genPassword } = require('../lib/passwordUtils');

// register the user on the server
const registerUser = (req, res) => {
  const { username, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const saltHash = genPassword(password);

  const { salt, hash } = saltHash;

  const newUser = new User({
    username,
    hash,
    salt,
  });

  return newUser
    .save()
    .then((user) => {
      console.log(user);
      return res.status(200).json({ message: 'Registration successful!' });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ message: 'That user already exists.' });
      }
      return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    });
};

// simple login message, not more is needed due the middleware
const login = (req, res) => res.status(200).json({ message: 'Login successful!' });

// calls the password.js logout function and redirects you to the home page
const logout = (req, res) => {
  req.logout();
  // returns you to the home page
  return res.redirect('/');
};

// get username that is stored in this session
const getUsername = (req, res) => {
  const username = req?.user?.username;
  if (username) {
    return res.status(200).json({ username });
  }
  return res.status(200).json({ username: '' });
};

// return an array of all the users on the server
const getUser = async (req, res) => {
  const users = await User.find({}, { username: 1 }).lean();
  res.status(200).json(users);
};

// deletes a user from the server
const deleteUser = async (req, res) => {
  const { username } = req.params;
  console.log(`Deleting ${username} and their teams`);

  // check if you are deleting yourself
  if (username === req.user.username) {
    return res.status(400).json({ message: 'You cannot delete yourself.' });
  }
  try {
    const teamPromise = Team.deleteMany({ username });
    const userPromise = User.deleteOne({ username });
    const queries = await Promise.all([teamPromise, userPromise]);
    const [teamQuery] = queries;
    return res
      .status(200)
      .json({ message: `Deleted ${username} and deleted ${teamQuery.deletedCount} teams.` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  registerUser,
  login,
  logout,
  getUsername,
  getUser,
  deleteUser,
};
