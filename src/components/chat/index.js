import React, {Component} from 'react';
import '../../stylesheets/main.scss';
import '../../stylesheets/components/chat.scss';
import Chatroom from './Chatroom';

class Index extends Component {
  constructor(props) {
    super(props);
    // Dummy items
    this.user = {
      id: 132224,
      username: 'Greencame',
      name: 'Julien',
      lastname: 'Mustière',
      image: 'https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f642.svg'
    };

    this.marker = {
      id: 2,
      name: 'bar'
    };
  }

  render() {
    return (
      <Chatroom marker={ this.marker } user={ this.user }/>
    );
  }
}

export default Index;
