const Marker = require('../../database/models/index').Marker;
const MarkerDescription = require('../../database/models/index').MarkerDescription;
const MarkerPicture = require('../../database/models/index').MarkerPicture;

const {BadRequest, NotFound} = require('../errors');

const express = require('express');

const marker = express.Router();

marker.get('/', (req, res) => {
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
});

marker.get('/description', (req, res) => {
  MarkerDescription.findOne({
    where: { marker_id: res.id },
    include: {attributes: [ 'picture' ], model: MarkerPicture, as: 'pictures'}
  }).then(tasks => {
    if(tasks) {
      let json = tasks.toJSON();
      json.pictures = json.pictures.map((p) => p.picture);
      res.json(json);
    } else {
      res.json(new NotFound('ID doesn\'t exist'));
    }
  });
});


module.exports = marker;
