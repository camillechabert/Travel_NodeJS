import React, {Component} from 'react';
import '../../stylesheets/main.scss';
import '../../stylesheets/components/chat.scss';
import Message from './Message';
import Notification from './Notification';
import Chat from '../../helpers/chat';
import PropTypes from 'prop-types';

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      connected: false,
      textarea: ''
    };

    this.submitMessage = this.submitMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeChat = this.handleChangeChat.bind(this);
  }

  componentWillReceiveProps(props) {
    // check
    if(this.props.marker.id !== props.marker.id) {
      // room by default

      this.chat.join(props.marker.id, this.props.user).then((data) => {
        this.setState({ room: data.room, history: data.history});
      });
    }
  }

  componentWillMount() {
    this.chat = Chat;
    this.chat.connect(this.props.marker.id);

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
        user: this.props.user,
        date: date.toDateString(),
        message: this.state.textarea
      };

      this.chat.sendMessage(dataToSend).then(() => {
        // console.log(data);
      }).catch(() => {
        // console.log(error);
      });
    }
  }

  handleChangeChat(e, o) {
    this.chat.join(o.value, this.props.user).then((data) => {
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
                { this.props.marker.name }
              </h3>
              <div>
                {
                  this.state.history ?
                    this.state.history.map((h, i) =>
                      (h.type === 'message') ?
                        <Message key={ i } isOwner={ h.data.user.id === this.props.user.id } message={h.data} key={'chat-' + i}/>
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

Chatroom.propTypes = {
  user: PropTypes.object.isRequired,
  marker: PropTypes.object.isRequired
};

export default Chatroom;
