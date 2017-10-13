const express = require('express');
const app = express();
const path = require("path");
const { routerApiv01, onBoardingRoutes } = require('../config/routes');

// Mount routes from router
app.use('/Apiv01', routerApiv01);

// Mount routes from boarding
app.use('/onBoarding', onBoardingRoutes);

app.listen(process.env.PORT || 3080, () => {
	console.log('App is Running on', process.env.PORT || 3080);
});