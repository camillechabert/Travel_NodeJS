const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const path = require("path");
const api = require('../routes/api');
const web = require('../routes/web');
const serverConf = require('../config/server');
const WebSocket = require('ws');

// Mount routes from router
app.use('/api', api.v01);

// Mount routes from boarding
app.use('/boarding', web.boarding);

//websocket 
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
 
wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
	  if (client.readyState === WebSocket.OPEN) {
		client.send(data);
	  }
	});
  };

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(data) {
		// Broadcast to everyone else.
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
});

//start server
server.listen(serverConf.port, () => {
	console.log('App is Running on', serverConf.port);
});

module.exports = server;