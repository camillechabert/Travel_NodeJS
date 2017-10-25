const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const path = require("path");
const api = require('./routes/api');
const web = require('./routes/web');
const chatroom = require('./lib/chatroom');
const serverConf = require('../config/server');

const server = http.createServer(app);

// Mount routes from router
app.use('/api', api.v01);

// Mount routes from boarding
app.use('/boarding', web.boarding);

//chat with socket.io
chatroom.listen(server);

process.env.SOCKET_URL = 'http://localhost:' + serverConf.port;

//start server
server.listen(serverConf.port, () => {
	console.log('App is Running on', serverConf.port);
});

module.exports = server;