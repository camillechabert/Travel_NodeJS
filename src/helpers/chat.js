class Chat {
    constructor(_ctx, _socket){
        this.ctx = _ctx
        this.socket = _socket; 
        this.room = null;
        this.rooms = [];

        this.socket.on('joinRoom', function(room) {
            this.ctx.setState({ currentRoom : room } )
            this.room = room;
        }.bind(this));      

        //get rooms
        this.socket.emit('rooms');        

        this.socket.on('rooms', function(rooms) {
            this.ctx.setState({ rooms : rooms })
        }.bind(this));     
    }

    send(name, message){
        console.info('CHAT send() : ' + name + " content : \n " + message );

        this.socket.emit(name, { room: this.room, message: message });        
    }

    sendMessage(message) {
        this.send('message', message)
    }

    on(name, callback){
        this.socket.on(name, function(data) { 
            console.info('CHAT on() : ' + name + " content : \n " + data );
        
            callback(data);
        }.bind(callback));
    }

    onMessage(callback){
        this.on('message', callback);
    }

    join(name) {
        console.info('CHAT join() : ' + name  );

        this.ctx.setState({currentRoom: name});        

        this.socket.emit('join', { 
            name: name
        });
    }

}

module.exports = Chat;