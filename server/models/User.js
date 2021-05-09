const mongoose = require('mongoose');

// A model for a user doc
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
