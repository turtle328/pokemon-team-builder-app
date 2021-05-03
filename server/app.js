const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const MongoStore = require('connect-mongo')(session);

const router = require('./router');

const app = express();
const port = process.env.PORT || 3001;

// Set up mongoose instance
const mongoUrl = 'mongodb+srv://alexRosenbach:KlaqWwJaxD4JDD8V@cluster0.xonqb.mongodb.net/PokemonApp';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(mongoUrl, mongoOptions, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongoUrl}`);
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
// Use the built-in body parser for json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Setup
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});
app.use(
  session({
    secret: 'Bq87^s57BQRS',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
);

// Passport authentication
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

// Express router
router(app);

// Start the server
app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Listening on port ${port}`);
});
