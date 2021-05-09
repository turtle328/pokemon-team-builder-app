const crypto = require('crypto');

// generate a secure password using crypto
const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash: genHash,
  };
};

// uses the password and salt to attempt to generate the same hash
// if it's the same it's a valid password
const validPassword = (password, hash, salt) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

module.exports = {
  genPassword,
  validPassword,
};
