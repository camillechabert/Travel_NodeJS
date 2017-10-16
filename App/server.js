const express = require('express');
const app = express();
const path = require("path");
const api = require('../routes/api');
const web = require('../routes/web');
const serverConf = require('../config/server');

// Mount routes from router
app.use('/api', api.v01);

// Mount routes from boarding
app.use('/boarding', web.boarding);

const server = app.listen(serverConf.port, () => {
	console.log('App is Running on', serverConf.port);
});

module.exports = server;
