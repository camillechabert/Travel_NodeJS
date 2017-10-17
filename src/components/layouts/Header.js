import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import Menu from './Menu';

class Header extends Component {

  render() {
    return (
      <header className="header">
          <AppBar 
            title="Planning scheduler"
            iconElementLeft={<Menu />} />
      </header>
    );
  }
}

export default Header;
