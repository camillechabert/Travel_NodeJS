import React, { Component } from 'react';
import GlobalMenu from './GlobalMenu';

class GlobalHeader extends Component {
  render() {
    return (
      <GlobalMenu userSession={this.props.userSession} dataPropagation={this.props.dataPropagation}/>
    );
  }
}

export default GlobalHeader;
