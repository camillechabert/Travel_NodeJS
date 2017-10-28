const express = require('express');
const path = require('path');
const http = require('http');
const jwt = require('jwt-simple');
const config = require('../../config/server');
const passport = require('../lib/AuthStrategy');
const User = require('../../database/models/index').User;

/************************************
 *      ROUTES AUTHENTICATION
 ****/
const routes = express.Router();

routes.post('/token', (req, res) => {
    const jhon = User.findOne({
        attributes: ['id', 'firstName', 'lasName', 'email'],
        where: { id: req.body.id, password: req.body.password }
    }).then((response) => {
        if (!response)
            res.statusCode = 404;

        res.json({ response: jwt.encode(response, config.jwtSecret) });
    }).catch((err) => {
        const error = err.name + ' ' + err.parent.code;

        res.statusCode = 500;
        res.json({ response: jwt.encode({ error: error }, config.jwtSecret) });
    });
});

routes.route('/user')
    .post(passport.auth(), (req, res) => {
        if (req.user.error === undefined)
            res.json(req.user);

        res.statusCode = req.user.statusCode;
        res.json({
            error: req.user.error
        });
    });

routes.route('/*')
    .get((req, res) => {
        res.status(404).send({ response: 'ERROR 404 - NOT FOUND' });
    })
    .post((req, res) => {
        res.status(404).send({ response: 'ERROR 404 - NOT FOUND' });
    });

module.exports = { routes };
