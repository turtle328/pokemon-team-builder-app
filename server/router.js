const controllers = require('./controllers');
const middleware = require('./middleware');

const router = app => {
  app.post('/register', controllers.User.registerUser);
  app.post('/authenticate', controllers.User.authenticate);
  app.get('/checkToken', middleware.withAuth, (req, res) => res.sendStatus(200));
  app.get('*', controllers.getReactPage);
};

module.exports = router;
