const express = require('express');
const path = require('path');
const http = require('http');

/************************************
 *      ROUTES API V01
 ****/
const routerApiv01 = express.Router();

routerApiv01.use((req, res, next) => {
    // Some MiddleWare logic there
	next();
});    

routerApiv01.get('/', (req, res) => {
    // Render some JsonStuff
});

/************************************
 *      ROUTES ONBOARDINGROUTES
 ****/
const onBoardingRoutes = express.Router();

onBoardingRoutes.use((req, res, next) => {
    // Allow access for different domain request
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

onBoardingRoutes.get('/', (req, res) => {
    const respFormat = req.get('content-type');

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({response: "Content succefully returned by the Api"}));
});

onBoardingRoutes.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/errors/404.html'));
});

module.exports = {
    routerApiv01,
    onBoardingRoutes
};
