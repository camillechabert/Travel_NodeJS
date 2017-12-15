const Marker = require('../../database/models/index').Marker;
const MarkerDescription = require('../../database/models/index').MarkerDescription;
const MarkerPicture = require('../../database/models/index').MarkerPicture;
const Room = require('../../database/models/index').Room;
const Note = require('../../database/models/index').Note;

const {BadRequest, NotFound} = require('../errors');

const express = require('express');

const marker = express.Router();

marker.get('/', (req, res) => {
  if(!res.id) {
    res.json(new BadRequest('Missing ID'));
  } else if(typeof res.id !== 'number') {
    res.json(new BadRequest('Wrong ID'));
  } else {
    Marker.findOne({ where: { id: res.id }, include: [
      { all: true, include: [
        { model: MarkerPicture, as: 'pictures'}
      ]}
    ]}).then(tasks => {
      if(tasks) {
        res.json(tasks);
      } else {
        res.json(new NotFound('ID doesn\'t exist'));
      }
    });
  }
});

module.exports = marker;
