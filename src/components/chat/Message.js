import React from 'react';
import '../../stylesheets/main.scss';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.message;
  }


  render() {
    const date = new Date(this.state.date);

    return (
      <div className={ this.props.isOwner ? 'ui feed ui vertical segment' : '' }>
        <div className="label">
          <img alt="user-picture" className="ui avatar image" src={ this.state.user.image } />
        </div>
        <div className="content">
          <div className="date">
            <a> { date.toLocaleDateString() } </a>
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

export default Message;
