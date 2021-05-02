const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
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
// Use the built-in body parser for incoming json data
app.use(express.json());
// Use cookie parser
app.use(cookieParser());

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Listening on port ${port}`);
});
