const express = require('express');
const path = require('path');
const http = require('http');

/************************************
 *      ROUTES ONBOARDINGROUTES
 ****/
const boarding = express.Router();

boarding.use((req, res, next) => {
    // Allow access for different domain request
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('content-type', 'application/json')

    next();
});

boarding.get('/', (req, res) => {
    const respFormat = req.get('content-type');

    res.send({response: "Content succefully returned by the Api"});
});

boarding.get('/*', (req, res) => {
    res.status(404).send({ response: 'ERROR 404 - NOT FOUND' });
});

module.exports = {
    boarding
};
