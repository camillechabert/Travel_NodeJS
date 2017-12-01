const express = require('express');
const path = require('path');
const http = require('http');
const jwt = require('jwt-simple');
const config = require('../../config/server');
const passport = require('../lib/AuthStrategy');
const User = require('../../database/models/index').User;

/** **********************************
 *      ROUTES AUTHENTICATION
 *** */
const routes = express.Router();

routes.post('/token', (req, res) => {
  const jhon = User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email'],
    where: { login: req.body.login, password: req.body.password }
  }).then((response) => {
    if (!response) {
      res.statusCode = 404;
    }

    res.json({ response: jwt.encode(response, config.jwtSecret) });
  }).catch((err) => {
    const error = `${err.name} ${err.parent.code}`;

    res.statusCode = 500;
    res.json({ response: jwt.encode({ error }, config.jwtSecret) });
  });
});

routes.route('/user')
  .post(passport.auth(), (req, res) => {
    if (req.user.error) {
      res.statusCode = req.user.statusCode;
      req.user = req.user.error;
    }

    res.json(req.user);
  });

routes.route('/create-user')
  .post((req, res) => {
    const newUserInstance = User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      login: req.body.login,
      email: req.body.email
    });

    if (newUserInstance) {
      newUserInstance.save().then((response) => {
        res.statusCode = 200;
        res.json({ response: jwt.encode(response, config.jwtSecret) });
      }).catch((error) => {
        res.statusCode = 409;
        res.json({ error: error.errors });
      });
    } else {
      res.statusCode = 500;
      res.json({ error: 'Fatal error on DB Query' });
    }
  });

routes.route('/*')
  .get((req, res) => {
    res.status(404).send({ response: 'ERROR 404 - NOT FOUND' });
  })
  .post((req, res) => {
    res.status(404).send({ response: 'ERROR 404 - NOT FOUND' });
  });

module.exports = { routes };
