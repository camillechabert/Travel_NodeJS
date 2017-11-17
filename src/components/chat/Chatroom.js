import React, {Component} from 'react';
import '../../stylesheets/main.scss';
import '../../stylesheets/components/chat.scss';
import Message from './Message';
import Notification from './Notification';
import io from 'socket.io-client';
import Chat from '../../helpers/chat';
import { Dropdown } from 'semantic-ui-react';
const { object } = React.PropTypes;

class Chatroom extends Component {
  constructor(props) {
    super(props);
    const date = new Date();

    // Dummy items
    let user = {
      id: 132224,
      username: 'Greencame',
      name: 'Julien',
      lastname: 'Mustière',
      image: 'https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f642.svg'
    };
    // json["chat"] = [
    //     {
    //         "message" : "coucou c'est moi",
    //         "date" : date.toDateString(),
    //         "user" : json.user
    //     },
    //     {
    //         "message" : "bienvenue en France",
    //         "date" : date.toDateString(),
    //         "user" : json.user
    //     },
    //     {
    //         "message" : "ici c'est pas chère",
    //         "date" : date.toDateString(),
    //         "user" : json.user
    //     }
    // ]

    this.state = {
      room: 'all',
      rooms: [],
      history: [],
      connected: false,
      user: user,
      textarea: ''
    };

    this.submitMessage = this.submitMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeChat = this.handleChangeChat.bind(this);
  }

  componentWillMount() {
    this.chat = new Chat(io.connect('http://localhost:3080'));

    // get all rooms
    this.chat.getRooms().then((data) => {
      this.setState({ rooms: data.rooms });
    });
    // room by default
    this.chat.join('default', this.state.user).then((data) => {
      this.setState({ room: data.room });
    });
    // when we receive a message
    this.chat.onMessage((data) => {
      let history = this.state.history.slice(0);
      history.push({ type: 'message', data: data });

      this.setState({
        textarea: '',
        history: history
      });
    });// can catch error
    // when we receive a notification
    this.chat.on('notification', (data) => {
      let history = this.state.history.slice(0);
      history.push({ type: 'notification', data: data });

      this.setState({ history: history });
    });// can catch error

    /**
         * Manage connection WITHOUT surcharging
         */
    // on connection
    this.chat.socket.on('connect', () => {
      this.setState({ connected: true });
    });
    this.chat.socket.on('reconnect', () => {
      this.setState({ connected: true });
    });
    // on disconnection
    this.chat.socket.on('error', () => {
      this.setState({ connected: false });
    });
    this.chat.socket.on('reconnect_error', () => {
      this.setState({ connected: false });
    });
  }

  submitMessage(e) {
    e.preventDefault();

    if (this.state.textarea !== '') {
      const date = new Date();
      const dataToSend = {
        user: this.state.user,
        date: date.toDateString(),
        message: this.state.textarea
      };

      this.chat.sendMessage(dataToSend).then(() => {
        // console.log(data);
      }).catch((error) => {
        // console.log(error);
      });
    }
  }

  handleChangeChat(e, o) {
    this.chat.join(o.value, this.state.user).then((data) => {
      this.setState({ room: data.room, history: [] });
    });
  }

  scrollToBot() {
    // ReactDOM.findDOMNode(this.refs['chat-box']).scrollTop = ReactDOM.findDOMNode(this.refs['chat-box']).scrollHeight;
  }

  handleChange(e) {
    this.setState({textarea: e.target.value});
  }

  render() {
    return (
      <div className="ui grid">
        <div className="four column row">
          <div className="right floated column ui piled segment">

            <div className="sixteen wide column">
              <h3 className="ui header">
                <Dropdown selection search onChange={ this.handleChangeChat } options={ this.state.rooms } value={ this.state.room } />
              </h3>
              <div>
                {
                  this.state.history ?
                    this.state.history.map((h, i) =>
                      (h.type === 'message') ?
                        <Message key={ i } isOwner={ h.data.user.id === this.state.user.id } message={h.data} key={'chat-' + i}/>
                        : (h.type === 'notification') ?
                          <Notification key={ i } image={ h.data.image } message={ h.data.message }/>
                          :
                          ''
                    )
                    : ''
                }
              </div>
            </div>

            <div className="sixteen wide column">
              <form className="ui message" onSubmit={ this.submitMessage }>
                <div className="ui icon input">
                  <div className="field">
                    <input type="texte" disabled={ !this.state.connected } value={ this.state.textarea } onChange={ this.handleChange } placeholder="Message"/>
                    {
                      this.state.connected ? '' :
                        <div className="ui pointing label">
                                                    You aren't connected to internet
                        </div>
                    }
                  </div>
                  <i className=" circular Comments icon" />
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

Chatroom.PropTypes = {
  user: object
};

export default Chatroom;
