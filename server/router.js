const passport = require('passport');
const controllers = require('./controllers');
const middleware = require('./middleware');

// app router
const router = (app) => {
  app.post('/register', controllers.User.registerUser);
  app.post('/login', passport.authenticate('local'), controllers.User.login);
  app.get('/logout', middleware.isAuth, controllers.User.logout);
  app.get('/getUsername', controllers.User.getUsername);
  app.get('/user', middleware.isAuth, controllers.User.getUser);
  app.delete('/user/:username', middleware.isAuth, controllers.User.deleteUser);
  app.get('/team/:username', controllers.Team.getTeams);
  app.get('/team', middleware.isAuth, controllers.Team.getTeams);
  app.post('/team', middleware.isAuth, controllers.Team.addTeam);
  app.put('/team', middleware.isAuth, controllers.Team.replaceTeam);
  app.delete('/team/:name/:username', middleware.isAuth, controllers.Team.deleteTeam);
  app.get('/create-team', middleware.isAuth, controllers.getReactPage);
  app.get('/random-team', middleware.isAuth, controllers.getReactPage);
  app.get('/edit-team', middleware.isAuth, controllers.getReactPage);
  app.get('/admin', middleware.isAuth, controllers.getReactPage);
  app.get('*', controllers.getReactPage);
};

module.exports = router;
