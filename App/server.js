const express = require('express');
const app = express();
const path = require("path");
const routes = require('../config/routes');

// Mount routes from router
app.use('/Apiv01', routes.routerApiv01);

// Mount routes from boarding
app.use('/onBoarding', routes.onBoardingRoutes);

app.listen(process.env.PORT || 3080, () => {
	console.log('App is Running on', process.env.PORT || 3080);
});