class Chat {
    constructor(_ctx, _socket){
        this.ctx = _ctx;
        this.socket = _socket;

        this.setState({
            room : 'default',
            rooms : [],
            history : []
        })

        this.on('joinRoom', function(room) {
            this.setState({ room : room });
            localStorage.setItem('chatname', room);
        }.bind(this));      

        //get rooms
        this.socket.emit('rooms');        

        this.on('rooms', function(rooms) {
            this.setState({ rooms : rooms });
        }.bind(this));     
    }

    /*
    *   STATE
    */
    setState(object) {
        this.ctx.setState( object )
    }

    getState(name) {
        return this.ctx.state[name];
    }

    /*
    *   SOCKET
    */
    send(name, message){
        console.info('CHAT send() : ' + name + " content : \n " + message );

        this.socket.emit(name, { room: this.getState('room'), message: message });        
    }

    sendMessage(message) {
        this.send('message', message)
    }

    on(name, callback = function(){}, register = false){
        this.socket.on(name, function(callback, data) {
            console.info('CHAT on() : ' + name + " content : \n " + data );

            if(register) {
                let history = this.getState('history');   
                console.log(data)          
                history.push({ type : name, data : data });
                
                this.setState({ history : history });
            }
        
            callback(data);
        }.bind(this, callback));
    }

    onMessage(callback){
        this.on('message', callback, true);
    }

    join(name, user = {}) {
        console.info('CHAT join() : ' + name  );

        if(name === "default")
            name = localStorage.getItem('chatname') || 'all';

        this.setState({
            room : name,
            history : []
        });

        this.socket.emit('join', {  name: name, user : user });
    }

}

module.exports = Chat;