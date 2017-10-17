import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';

class Header extends Component {

  render() {
    return (
      <header className="header">
          <AppBar title="Planning scheduler" />
      </header>
    );
  }
}

export default Header;
