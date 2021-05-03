const passport = require('passport');
const controllers = require('./controllers');
const middleware = require('./middleware');

const router = (app) => {
  app.post('/register', controllers.User.registerUser);
  app.post('/login', passport.authenticate('local'), controllers.User.login);
  app.get('/logout', controllers.User.logout);
  app.get('/getUsername', controllers.User.getUsername);
  app.put('/saveTeam', middleware.isAuth, controllers.Team.saveTeam);
  app.get('/create-team', middleware.isAuth, controllers.getReactPage);
  app.get('*', controllers.getReactPage);
};

module.exports = router;
