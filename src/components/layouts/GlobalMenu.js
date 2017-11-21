import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Container, Icon, Menu, Segment } from 'semantic-ui-react';
import { store } from '../../store';
import PropTypes from 'prop-types';

class GlobalMenu extends Component {
  constructor(props) {
    super(props);
  }

  logOut() {
    this.props.dataPropagation(false);
    store.dispatch({ type: 'DROP_USER' });
  }

  // Must be improve, keep it for cam&fran
  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign='center'
          vertical
        >
          <Container>
            <Menu inverted pointing stackable size='small'>
              <Menu.Item as={Link} to='/' active>Home</Menu.Item>
              <Menu.Item as={Link} to='/faq'>Faq</Menu.Item>
              <Menu.Item as='a'>Company</Menu.Item>
              <Menu.Item as='a'>Careers</Menu.Item>
              <Menu.Item position='right'>
                {
                  this.props.userSession ? (
                    <div>
                      <Button as={Link} to='/map' color='orange' inverted><Icon name="map"/> Map </Button>
                      <Button as={Link} to='/edit' inverted><Icon name="setting"/> Settings </Button>
                      <Button as={Link} to='/' onClick={() => {
                        this.logOut();
                      }} style={{ marginLeft: '0.5em' }} inverted> <Icon name="log out" /> Log Out </Button>
                    </div>
                  ) : (
                    <div>
                      <Button as={Link} to='/login' inverted> <Icon name="user" /> Log In </Button>
                      <Button as={Link} to='/sign-up' style={{ marginLeft: '0.5em' }} inverted> Sign In </Button>
                    </div>
                  )
                }
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
      </div>
    );
  }
}

GlobalMenu.propTypes = {
  userSession: PropTypes.bool,
  dataPropagation: PropTypes.func
};

export default GlobalMenu;
