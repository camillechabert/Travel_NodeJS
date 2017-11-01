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
    _handleMessageBroadcasting(socket, nicknames);
    //Change room
    _handleRoomJoining(socket);
    
    //provide all rooms availables
    socket.on('rooms', function(response, fn) {
      fn( parse(socket, true , "rooms available", { rooms : rooms }) ) ;
    });
    
    _handleClientDisconnection(socket, nicknames);
  });
};

  function joinRoom(socket, room, user) {
    socket.join(room); //Make user join room
    
    socket.broadcast.to(room).emit('newUser', parse(socket, true , "new user connected", { user: user }) );

    //Show how many users there are in the room
    socket.emit('notifications', parse(socket, true , "number of users", { message : 'Users connected : ' + (io.sockets.adapter.rooms[room].length - 1) } ) );
  }

  /*
  Broadcasting message by room
  */
  function _handleMessageBroadcasting(socket, nicknames) {
    socket.on('message', function (response, fn) {
      messageToSave.push(response); console.log(messageToSave)

      fn( parse(socket, true, "message received"));

      io.sockets.in(response.room).emit('message', parse(socket, true , "new message", response.data) ); 
    });
  }
  /*
  allows a user to join an existing room.
  */
  function _handleRoomJoining(socket) {
    socket.on('join', function(response, fn) { 
      let data = response.data;

      if(rooms.filter(function(r) { return r.value === data.name}).length !== -1){
        socket.leave(rooms[socket.id]);
        joinRoom(socket, data.name, data.user);

        fn( parse(socket, true , "room name", { room : data.name }) );//send info
      } else {

        fn( parse(socket, false , "The room doesn't exist") );//send info
      }
    });
  }
  /*
  remove a user's nickname when the user leaves the chat application.
  */
  function _handleClientDisconnection(socket, nicknames) {
    socket.on('disconnect', function() {
      delete nicknames[socket.id];
    }); 
  }

  /*
  parse always the same response
  */
  function parse(socket, boolean, string_info, object = {}){

    return { 
      success : boolean, 
      info : { 
        id : socket.id, 
        message : string_info 
      },
      data : object 
    };
  }