const Marker = require('../../database/models/index').Marker;
const MarkerDescription = require('../../database/models/index').MarkerDescription;
const MarkerPicture = require('../../database/models/index').MarkerPicture;
const Room = require('../../database/models/index').Room;
const Note = require('../../database/models/index').Note;

const {BadRequest, NotFound} = require('../errors');

const express = require('express');

const markerDescription = express.Router();

markerDescription.get('/', (req, res) => {
  MarkerDescription.findOne({ where: { id: res.id }, include: [
    { model: MarkerPicture, as: 'pictures'}
  ]}).then(tasks => {
    if(tasks) {
      res.json(tasks);
    } else {
      res.json(new NotFound('ID doesn\'t exist'));
    }
  });
});

module.exports = markerDescription;
