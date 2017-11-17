import React, { Component } from 'react';
import GlobalMenu from './GlobalMenu';
const { bool, func } = React.PropTypes;

class GlobalHeader extends Component {
  render() {
    return (
      <GlobalMenu userSession={this.props.userSession} dataPropagation={this.props.dataPropagation}/>
    );
  }
}

GlobalHeader.propTypes = {
  userSession: bool,
  dataPropagation: func
};

export default GlobalHeader;
