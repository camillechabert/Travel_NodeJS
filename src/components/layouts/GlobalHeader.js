import React, { Component } from 'react';
import GlobalMenu from './GlobalMenu';
import PropTypes from 'prop-types';

class GlobalHeader extends Component {
  render() {
    return (
      <GlobalMenu userSession={this.props.userSession} dataPropagation={this.props.dataPropagation}/>
    );
  }
}

GlobalHeader.propTypes = {
  userSession: PropTypes.bool,
  dataPropagation: PropTypes.func
};

export default GlobalHeader;
