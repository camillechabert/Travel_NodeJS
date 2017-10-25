const socketio = require('socket.io');

exports.listen = function(_server) {
  io = socketio.listen(_server);
  //Start the Socket.io server, allowing it to piggyback on the existing HTTP server
  io.set('log level', 1);

  // this must be get out of there
  io.on('connection', function(client) {
    io.emit('client_disconnected', /* CLIENT ID WHO MUST BE CONNTECTED TO THE ROOM */);
    client.on('message', function(data) {
        messageToSave.push(data);
        console.log(messageToSave);
        io.emit('message', data);
    });
  });

  io.on('disconnect', function(client) {
      io.emit('client_disconnected', /* CLIENT ID WHO MUST BE DISCONNECTED FROM THE ROOM */);
  });

};