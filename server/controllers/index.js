const path = require('path');
const User = require('./User');
const Team = require('./Team');

// obtain the react app page
const getReactPage = (req, res) => res.sendFile(path.join(`${__dirname}/../../client/build/index.html`));

module.exports = {
  getReactPage,
  User,
  Team,
};
