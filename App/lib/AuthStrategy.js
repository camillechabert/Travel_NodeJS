const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../../config/server');
const extend = require('util')._extend;
const User = require('../../database/models/index').User;
const UserCredential = require('./UserCredential');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromBodyField(config.queryTokenName);
opts.secretOrKey = config.jwtSecret;
opts.algorithms = ['HS256'];

passport.use(new jwtStrategy(opts, (payload, done) => {
  const credentialInstance = new UserCredential(payload);
  const credential = credentialInstance.getCredential();
  const response = {};

  if (credential.error) {
    return done(null, credential);
  }

  User.findOne({
    attributes: ['id', 'first_name', 'last_name', 'email', 'avatar'],
    where: { id: credential.id }
  }).then((response) => {
    if (!response) {
      response = credentialInstance.errorFormat('QueryError -> User has been not found', 404);
    }

    return done(null, response);
  }).catch((err) => {
    const error = `${err.name} -> ${err.parent.code}`;
    return done(null, credentialInstance.errorFormat(error, 500));
  });
}));

module.exports.initialize = () => passport.initialize();
module.exports.auth = () => passport.authenticate('jwt', config.jwtSession);
