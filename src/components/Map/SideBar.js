import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.size = props.destinations.length;
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.destinations.length === this.size) {
      return;
    }
    this.size = nextProps.destinations.length;
    this.setState({ visible: true });
  }

  render() {
    return (
      <div>
        <Sidebar as={Menu} style={{paddingTop: 88, zIndex: 1}} animation='overlay' width='wide' visible={this.state.visible} icon='labeled' vertical>
          <Button icon='close' floated='right' color='google plus' onClick={() => this.toggleVisibility()} />
          <div style={{marginTop: 55}}>
            {this.props.destinations.map((dest) => (
              <Menu.Item key={dest.place_id} name='home'>
                <Icon name='home' />
                {dest.name}
              </Menu.Item>
            ))}
          </div>
        </Sidebar>
      </div>
    );
  }
}

SideBar.propTypes = {
  visible: PropTypes.any,
  destinations: PropTypes.array
};

export default SideBar;
