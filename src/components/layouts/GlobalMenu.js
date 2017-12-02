import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Container, Icon, Menu, Segment } from 'semantic-ui-react';
import { store } from '../../store';
import PropTypes from 'prop-types';
import { dropUserAsync } from '../../actions/userActions';

class GlobalMenu extends Component {
  constructor(props) {
    super(props);

    this.menu = [
      { name: 'Home', link: '/'},
      { name: 'FAQ', link: '/faq'},
      { name: 'Career', link: '/career'},
      { name: 'company', link: 'company'}
    ];

    this.state = {
      activeItem: this.props.location.pathname
    };
  }

  handleIsActive(tag) {
    browserHistory.push({
      pathname: tag
    });

    this.setState({activeItem: tag});
  }

  isActive() {

  }

  logOut() {
    store.dispatch(dropUserAsync());
  }

  // Must be improve, keep it for cam&fran
  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign='center'
          vertical
          style={{zIndex: 3}}
        >
          <Container>
            <Menu inverted pointing stackable size='small'>
              {
                this.menu.map((item) =>
                  <Menu.Item as='a' name={ item.name } key={ 'sidebar-' + item.name } className={ (this.state.activeItem === item.link) ? 'active' : ''} onClick={(e) => {
                    this.handleIsActive(item.link);
                  } }/>
                )
              }

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
  dataPropagation: PropTypes.func,
  location: PropTypes.any
};

export default GlobalMenu;
