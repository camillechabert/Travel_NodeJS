const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const path = require("path");
const api = require('../routes/api');
const web = require('../routes/web');
const serverConf = require('../config/server');

const server = http.createServer(app);
const io = require('socket.io')(server);


//const WebSocket = require('ws');

// Mount routes from router
app.use('/api', api.v01);

// Mount routes from boarding
app.use('/boarding', web.boarding);

// this must be get out of there
io.on('connection', function(client) {
	io.emit('client_disconnected', /* CLIENT ID WHO MUST BE CONNTECTED TO THE ROOM */);
	client.on('message', function(data) {
		io.emit('message', data);
	});
});

io.on('disconnect', function(client) {
	io.emit('client_disconnected', /* CLIENT ID WHO MUST BE DISCONNECTED FROM THE ROOM */);
});


process.env.SOCKET_URL = 'http://localhost:' + serverConf.port;

//start server
server.listen(serverConf.port, () => {
	console.log('App is Running on', serverConf.port);
});

module.exports = server;