const express = require('express');
const app = express();
const path = require("path");
const api = require('../routes/api');
const web = require('../routes/web');
const server = require('../config/server');

// Mount routes from router
app.use('/api', api.v01);

// Mount routes from boarding
app.use('/boarding', web.boarding);

app.listen(server.port, () => {
	console.log('App is Running on', server.port);
});