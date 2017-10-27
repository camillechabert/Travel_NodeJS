class Chat {
    constructor(_socket){
        this.socket = _socket;
        this.room = null;
    }

    /*
    *   SOCKET
    */
    send(name, message){

        return this.emit(name, message);        
    }

    join(name, user = {}) {
        if(name === "default")
            name = localStorage.getItem('chatname') || 'all';

        return this.emit('join', {  name: name, user : user }).then(function(data) {
            localStorage.setItem('chatname', data.room);//register in localstorage
            this.room = data.room;

            return data;
        }.bind(this));
    }

    getRooms(){

        return this.emit('rooms');
    }

    parse(object) {
        return {
            room : this.room,
            data: object
        }
    }

    /**
     * shortcup
     */
    sendMessage(message) {

        return this.send('message', message)
    }

    onMessage(callback, error = function(){}){

        this.on('message', callback, error);
    }

    /*
    * Surcharging method emit of socket.io 
    */
    emit(name, object = {}) {

        return new Promise( function(resolve, reject) {
            this.socket.emit(name, this.parse( object ), function( response ) {
                if( typeof response === "object" && typeof response.data === "object") {
                    if( response.success === true ) {
                        resolve( response.data );
                    } else {
                        if( response.info && response.info.message && typeof response.info.message === "string" ) {
                            reject( response.info.message );
                        } else {
                            reject( "The request was not successful." )
                        }
                    }
                } else {
                    reject( "The response to your request could not be parsed." );
                }
            });
        }.bind(this));
    }

    /*
    * Surcharging method on of socket.io 
    */
    on(name, callback = function(){}, error = function(){}){
        this.socket.on(name, function (response) {
            if( typeof response === "object" ) {
                if( response.success === true && typeof response.data === "object" ) {
                    callback( response.data );
                } else {
                    if( response.info && response.info.message && typeof response.info.message === "string" ) {
                        error( response.info.message );
                    } else {
                        error( "The request was not successful." )
                    }
                }
            } else {
                error( "The response to your request could not be parsed." );
            }
        })
    }
}

module.exports = Chat;