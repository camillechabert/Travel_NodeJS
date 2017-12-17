import React, { Component } from 'react';
import { Sidebar, Segment, Button, Card, Image, Dimmer, Loader, Icon, Accordion, Menu } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import Chatroom from './../../chat/Chatroom';
import Grade from './grade';

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      chatroom: false,
      menuItem: 'Info'
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ visible: true, menuItem: 'Info' });
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  toggleChatroom() {
    this.setState({ chatroom: !this.state.chatroom });
  }

  handleMenu(name) {
    this.setState({ menuItem: name });
  }

  render() {
    return (
      <div>
        <Sidebar
          as={Segment}
          style={{paddingTop: 88, zIndex: 5}}
          animation='overlay'
          width='wide'
          visible={this.state.visible}
          icon='labeled'
          direction='right'
          vertical
        >
          <Button icon='close' floated='right' color='google plus' onClick={() => this.toggleVisibility()} />

          { this.props.marker.isLoading ?
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer> : '' }

          { !this.props.marker.isLoading && this.props.marker.data ?
            <div>
              <Card
                image={ this.props.marker.data.pictures[0] }
                header={(
                  <Menu pointing secondary>
                    <Menu.Item name='Info' active={this.state.menuItem === 'Info'} onClick={(e, { name }) => this.handleMenu(name)} />
                    <Menu.Item name='Description' active={this.state.menuItem === 'Description'} onClick={(e, { name }) => this.handleMenu(name)} />
                    <Menu.Item name='Other' active={this.state.menuItem === 'Other'} onClick={(e, { name }) => this.handleMenu(name)} />
                  </Menu>
                )}
                meta="no"
                description={ this.props.marker.data.description }
                extra={(
                  <div>
                    <Grade stars={ this.props.marker.data.stars } />

                    <Accordion>
                      <Accordion.Title active={ this.state.chatroom } onClick={() => this.toggleChatroom()}>
                        <Icon name='comment' />
                      </Accordion.Title>
                      <Accordion.Content active={ this.state.chatroom }>
                        <Chatroom user={ this.props.user } marker={ this.props.marker } active={ this.state.chatroom }/>
                      </Accordion.Content>
                    </Accordion>
                  </div>
                )}
              />

            </div>
            : 'error'
          }


        </Sidebar>
      </div>
    );
  }
}

Description.propTypes = {
  user: PropTypes.object,
  marker: PropTypes.object
};

export default Description;
