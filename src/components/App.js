import React, {Component} from "react";
import "../stylesheets/main.scss";
import Header from './layouts/Header';
import Footer from './layouts/Footer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div id="page-wrapper" className="main-app">
          <Header />
            <div className="content-app">
              {this.props.children}
            </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default  App;
