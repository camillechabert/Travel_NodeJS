import io from 'socket.io-client';
const server = require('./../../config/server');

class Chat {
  /*
    *   SOCKET
    */
  user(user) {
    this.user = user;

    return this;
  }

  connect(room = null) {
    this.room = room;
    this.socket = io('http://localhost:' + server.port, { query: 'room=' + room }).connect();
  }

  send(name, message) {
    return this.emit(name, message);
  }

  join(id, user = {}) {
    let idRoom = id;

    if(idRoom === 'default') {
      idRoom = self.localStorage.getItem('chat_id') || 0;
    }

    return this.emit('join', { name: idRoom, user: user }).then(function (data) {
      self.localStorage.setItem('chat_id', idRoom);// register in localstorage
      this.room = idRoom;

      return data;
    });
  }

  /* getRooms() {
    return this.emit('rooms');
  }*/

  parse(object) {
    return {
      room: this.room,
      user: this.user,
      data: object
    };
  }

  sendMessage(message) {
    return this.send('message', message);
  }

  onMessage(callback, error = function () {}) {
    this.on('message', callback, error);
  }

  /*
    * Surcharging method emit of socket.io
    */
  emit(name, object = {}) {
    if(!this.socket) {
      this.connect();
    }

    return new Promise(function (resolve, reject) {
      this.socket.emit(name, this.parse(object), function (response) {
        if(typeof response === 'object' && typeof response.data === 'object') {
          if(response.success === true) {
            resolve(response.data);
          } else if(response.info && response.info.message && typeof response.info.message === 'string') {
            reject(response.info.message);
          } else {
            reject('The request was not successful.');
          }
        } else {
          reject('The response to your request could not be parsed.');
        }
      });
    }.bind(this));
  }

  /*
    * Surcharging method on of socket.io
    */
  on(name, callback = function () {}, error = function () {}) {
    this.socket.on(name, function (response) {
      if(typeof response === 'object') {
        if(response.success === true && typeof response.data === 'object') {
          callback(response.data);
        } else if(response.info && response.info.message && typeof response.info.message === 'string') {
          error(response.info.message);
        } else {
          error('The request was not successful.');
        }
      } else {
        error('The response to your request could not be parsed.');
      }
    });
  }
}

module.exports = new Chat();
