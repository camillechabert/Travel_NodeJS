const socketio = require('socket.io');
let messageToSave = [];
let history = [];
let nicknames = [];
const rooms = require('./country');
const defaultRoom = "all";

exports.listen = function(_server) {
  const io = socketio.listen(_server);
  //allowing it to piggyback on the existing HTTP server
  io.set('log level', 1);

  //nb of users 
  //io.sockets.sockets.length
  //io.engine.clientsCount

  io.sockets.on('connection', function (socket) {
    io.emit('client_disconnected', /* CLIENT ID WHO MUST BE DISCONNECTED FROM THE ROOM */);    

    nicknames[socket.id] = '#'+nicknames.length;
    console.log(nicknames, 'connexion');
    //Assign user a defaultRoom when they connect
    joinRoom(socket, defaultRoom); 
    //Broadcasting message by room
    handleMessageBroadcasting(io, socket, nicknames);
    //Change room
    handleRoomJoining(socket);
    
    //provide all rooms availables
    socket.on('rooms', function() {
      socket.emit('rooms', rooms);
    });
    
    handleClientDisconnection(socket, nicknames);
  });
};

  function joinRoom(socket, room) {
    console.log('change room');
    socket.join(room); //Make user join room
    socket.emit('joinRoom', room); //Let user know 
    
    socket.broadcast.to(room).emit('message', {
      text: nicknames[socket.id] + ' has joined ' + room + '.'
    });

    //Show how many users there are in the room
    var usersInRoomSummary = 'Users currently in ' + room + ': ' //+ (io.sockets.clients(room) - 1);

    socket.emit('userInRoom', {message: usersInRoomSummary});
  }

  /*
  Broadcasting message by room
  */
  function handleMessageBroadcasting(io, socket, nicknames) {
    socket.on('message', function (data) {
      messageToSave.push(data);
      io.sockets.in(data.room).emit('message', data.message); 
    });
  }
  /*
  allows a user to join an existing room.
  */
  function handleRoomJoining(socket) {
    socket.on('join', function(room) {
      console.log(rooms.filter(function(r) { return r.value === room.name}))
      if(rooms.filter(function(r) { return r.value === room.name}).length !== -1){
        socket.leave(rooms[socket.id]);
        joinRoom(socket, room.name);
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