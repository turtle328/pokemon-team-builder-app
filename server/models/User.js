const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
UserSchema.pre('save', function hashPass(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPass) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPass;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function checkPass(password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
