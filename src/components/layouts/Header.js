import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

class Header extends Component {

  render() {
    return (
      <header className="header">
        <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
          <AppBar title="Planning scheduler" />
        </MuiThemeProvider>
      </header>
    );
  }
}

export default Header;
