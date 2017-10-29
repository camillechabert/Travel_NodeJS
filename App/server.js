const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const path = require("path");
const api = require('./routes/api');
const auth = require('./routes/authentication');
const chat = require('./lib/chat');
const serverConf = require('../config/server');
const bodyParser = require('body-parser');
const authStrategy = require('./lib/AuthStrategy');

const server = http.createServer(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authStrategy.initialize());

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});
app.use('/api', api.v01);
app.use('/auth', auth.routes);


chat.listen(server);

process.env.SOCKET_URL = 'http://localhost:' + serverConf.port;

server.listen(serverConf.port, () => {
	console.log('App is Running on', serverConf.port);
});

module.exports = server;