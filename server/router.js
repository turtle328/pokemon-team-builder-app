const passport = require('passport');
const controllers = require('./controllers');
const middleware = require('./middleware');

const router = app => {
  app.post('/register', controllers.User.registerUser);
  app.post('/login', passport.authenticate('local'), controllers.User.login);
  app.get('/logout', middleware.isAuth, controllers.User.logout);
  app.get('/getUsername', controllers.User.getUsername);
  // TODO: put an admin only endpoint for getting a list of users: /users
  // TODO: put a RESTFUL endpoint for geting a team by user: /team/:username
  app.get('/team/:username', controllers.Team.getTeams);
  app.get('/team', middleware.isAuth, controllers.Team.getTeams);
  app.post('/team', middleware.isAuth, controllers.Team.addTeam);
  app.put('/team', middleware.isAuth, controllers.Team.replaceTeam);
  app.get('/create-team', middleware.isAuth, controllers.getReactPage);
  app.get('*', controllers.getReactPage);
};

module.exports = router;
