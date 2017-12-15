const express = require('express');
const marker = require('../lib/marker');

/** **********************************
 *      ROUTES API V01
 *** */
const v01 = express.Router();

v01.use((req, res, next) => {
  // Some MiddleWare logic there
  next();
});

v01.get('/', (req, res) => {
  // Render some JsonStuff
});

v01.use('/marker/:uid', (req, res, next) => {
  res.id = +req.params.uid;

  if(!res.id) {
    res.json(new BadRequest('Missing ID'));
  } else if(typeof res.id !== 'number') {
    res.json(new BadRequest('Wrong ID'));
  }

  next();
});
v01.use('/marker/:uid', marker);

module.exports = {
  v01
};
