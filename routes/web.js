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

    next();
});

boarding.get('/', (req, res) => {
    const respFormat = req.get('content-type');

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({response: "Content succefully returned by the Api"}));
});

boarding.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/errors/404.html'));
});

module.exports = {
    boarding
};
