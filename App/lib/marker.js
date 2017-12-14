const Marker = require('../../database/models/index').Marker;
const MarkerDescription = require('../../database/models/index').MarkerDescription;
const MarkerPicture = require('../../database/models/index').MarkerPicture;
const Room = require('../../database/models/index').Room;
const Note = require('../../database/models/index').Note;

const express = require('express');

const marker = express.Router();

marker.get('/', (req, res) => {
  Marker.findOne({ id: res.id, include: [
    { all: true, include: [
      { model: MarkerPicture, as: 'pictures'},
      { model: Room, as: 'room'},
      { model: Note, group: 'type' }
    ]}
  ]}).then(tasks => {
    res.json(tasks);
  });
});

module.exports = marker;
