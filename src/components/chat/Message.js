import React from 'react';
import '../../stylesheets/main.scss';
import moment from 'moment';
const { bool, object } = React.PropTypes;

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.message;
  }


  render() {
    const date = moment(new Date(this.state.date)).fromNow();

    return (
      <div className={ this.props.isOwner ? 'ui feed ui vertical segment' : '' }>
        <div className="label">
          <img alt="user-picture" className="ui avatar image" src={ this.state.user.image } />
        </div>
        <div className="content">
          <div className="date">
            <a> { date } </a>
          </div>
          <div className="summary">
            <a> { this.state.user.username } </a>
          </div>
          <div className="extra text">
            <p> { this.state.message } </p>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  isOwner: bool,
  message: object.isRequired
};

export default Message;
