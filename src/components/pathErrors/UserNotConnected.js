import React, { Component } from 'react';
import { Button, Header, Image, Icon } from 'semantic-ui-react';
import { browserHistory, Link } from 'react-router';

class UserNotConnected extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>
          <h1>You are not authorized to come here please back home</h1>
          <Button.Group>
            <Button as={Link} to='/' positive>Back Home</Button>
          </Button.Group>
        </Header.Content>
      </Header>
    );
  }
}


export default UserNotConnected;
