import React, { Component } from 'react';
import { Sidebar, Button, Dimmer, Loader, Menu, Tab, List, Segment, Icon, Accordion, Message} from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import Slide from '../../util/slide';
import Chatroom from './../../chat/Chatroom';
import Grade from './grade';
import {store} from '../../../store';
import { addGrade } from '../../../actions/map/gradeActions';
import '../../../stylesheets/components/map.scss';

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      chatroom: false,
      menuItem: 'Info'
    };

    this.category = [
      { menuItem: 'Hours', render: () =>
        <Tab.Pane className="categories">
          <List>
            <List.Item>Monday : 12 am - 11 pm</List.Item>
            <List.Item>Tuesday : 12 am - 11 pm</List.Item>
            <List.Item>Wednesday : 12 am - 11 pm</List.Item>
            <List.Item>thursday : 12 am - 11 pm</List.Item>
            <List.Item>Friday : 12 am - 12 am pm</List.Item>
            <List.Item>Saturday : 12 am - 12 pm</List.Item>
            <List.Item>Sunday : Closed</List.Item>
          </List>
        </Tab.Pane>
      },
      { menuItem: 'Description', render: () =>
        <Tab.Pane className="categories">
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
        </Tab.Pane>
      },
      { menuItem: 'Other', render: () => <Tab.Pane className="categories">Autres informations</Tab.Pane> }
    ];
  }

  componentWillReceiveProps(props) {
    if(this.props.marker !== props.marker) {
      this.setState({ visible: true, chatroom: false, menuItem: 'Info' });
    }
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

  handleGrade(grade) {
    if(this.props.marker.data.id && this.props.user.id && grade) {
      store.dispatch(addGrade(this.props.marker.data.id, this.props.user.id, 'general', grade));
    }
  }

  addDestination() {
    console.log('ajouté dans le parcours');
  }


  render() {
    return (
      <div>
        <Sidebar
          style={{width: '330px', height: '100%', backgroundColor: '#fff'}}
          animation='overlay'
          visible={this.state.visible}
          direction='right'
        >
          <div className="headerSidebar">
            <div>
              <img src='../../../media/icons/bed.svg'/>
              <h1>Le Lestonnat</h1>
              <Button icon='close' size='small' floated='right' color='blue' onClick={() => this.toggleVisibility()} />
            </div>
          </div>
          { this.props.marker.isLoading ?
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            : ''
          }
          { !this.props.marker.isLoading && this.props.marker.data && Object.keys(this.props.marker.error).length === 0 ?
            <div>
              <Slide pictures={ this.props.marker.data.pictures } />

              <Tab menu={{ secondary: true, pointing: true }} panes={this.category} />
              <div className="bloc">
                <Grade grade={ this.props.marker.data.stars } onClick={ (i) => this.handleGrade(i) }/>
              </div>
              <div className="bloc">
                <Button basic color="teal">
                    Add
                </Button>
                <Button basic color="blue">
                    Edit informations
                </Button>
              </div>
              <div className="chatroom bloc">
                <div active={ this.state.chatroom }>
                  <Chatroom user={ this.props.user } marker={ this.props.marker } active={ this.state.chatroom }/>
                </div>
              </div>
            </div>
            :
            <Message negative>
              <Message.Header>We're sorry</Message.Header>
              <p>{ this.props.marker.error.message || 'Unknow' }</p>
            </Message>
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
