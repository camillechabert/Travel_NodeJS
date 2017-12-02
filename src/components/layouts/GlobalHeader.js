import React, { Component } from 'react';
import GlobalMenu from './GlobalMenu';
import PropTypes from 'prop-types';

class GlobalHeader extends Component {
  render() {
    return (
      <GlobalMenu {...this.props}/>
    );
  }
}

GlobalHeader.propTypes = {
  userSession: PropTypes.bool
};

export default GlobalHeader;
