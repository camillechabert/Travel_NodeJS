import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { store } from '../store';
import UserNotConnected from './pathErrors/UserNotConnected';
const { func } = React.PropTypes;

/**
 * The routes Manager ensure that roles and session are properly rendered
 * @param {* Roles can be defined from this classes ['admin', 'user', ...]} roles
 * @param {* Determine if the current call must be done from a user session or not} userRequired
 */
const Dispatcher = (roles, userRequired) =>
  (DynamicComponent, options = {}) => {
    class Manager extends Component {
      constructor(props) {
        super(props);
        this.state = { isConnected: this.userIsConnected() };
      }

      userIsConnected() {
        return ('store: ', store.getState().user.token !== null);
      }

      userUpdate(signal) {
        this.props.dataPropagation(signal);
        this.setState({ isConnected: signal });
      }

      render() {
        if (userRequired && !this.userIsConnected()) {
          return (
            <Grid container columns={1}>
              <Grid.Column>
                <UserNotConnected />
              </Grid.Column>
            </Grid>
          );
        }

        if (options.raw) {
          return (
            <DynamicComponent userSession={this.state.isConnected} userUpdate={this.userUpdate.bind(this)} />
          );
        }

        return (
          <Grid container columns={1}>
            <Grid.Column>
              <DynamicComponent userSession={this.state.isConnected} userUpdate={this.userUpdate.bind(this)} />
            </Grid.Column>
          </Grid>
        );
      }
    }

    Manager.propTypes = {
      dataPropagation: func.isRequired
    };

    return Manager;
  };

export default Dispatcher;
