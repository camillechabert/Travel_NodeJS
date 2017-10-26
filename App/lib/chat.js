const socketio = require('socket.io');
let messageToSave = [];
let history = [];
let nicknames = [];
const rooms = require('./country');
const defaultRoom = "all";
let io;

exports.listen = function(_server) {
  io = socketio.listen(_server);
  //allowing it to piggyback on the existing HTTP server
  io.set('log level', 1);

  //nb of users 
  //io.sockets.sockets.length
  //io.engine.clientsCount

  io.sockets.on('connection', function (socket) {
    io.emit('client_disconnected', /* CLIENT ID WHO MUST BE DISCONNECTED FROM THE ROOM */);    

    //Broadcasting message by room
    handleMessageBroadcasting(socket, nicknames);
    //Change room
    handleRoomJoining(socket);
    
    //provide all rooms availables
    socket.on('rooms', function() {
      socket.emit('rooms', rooms);
    });
    
    handleClientDisconnection(socket, nicknames);
  });
};

  function joinRoom(socket, room, user) {
    console.log('change room');
    socket.join(room); //Make user join room
    socket.emit('joinRoom', room); //Let user know 
    
    socket.broadcast.to(room).emit('newUser', {
      user: user
    });

    //Show how many users there are in the room
    var usersInRoomSummary = 'Users connected : ' + (io.sockets.adapter.rooms[room].length - 1);

    socket.emit('notifications', {message: usersInRoomSummary});
  }

  /*
  Broadcasting message by room
  */
  function handleMessageBroadcasting(socket, nicknames) {
    socket.on('message', function (data) {
      messageToSave.push(data);
      io.sockets.in(data.room).emit('message', JSON.parse(data.message) ); 
    });
  }
  /*
  allows a user to join an existing room.
  */
  function handleRoomJoining(socket) {
    socket.on('join', function(data) {
      if(rooms.filter(function(r) { return r.value === data.name}).length !== -1){
        socket.leave(rooms[socket.id]);
        joinRoom(socket, data.name, data.user);
      }
    });
  }
  /*
  remove a user's nickname when the user leaves the chat application.
  */
  function handleClientDisconnection(socket, nicknames) {
    socket.on('disconnect', function() {
      delete nicknames[socket.id];
    }); 
  }