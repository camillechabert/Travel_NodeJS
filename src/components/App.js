import React from "react";
import "../stylesheets/main.scss";
import Header from './layouts/Header';
import Footer from './layouts/Footer';

class App extends React.Component {

  render() {
    return (
      <div id="page-wrapper" className="main-app">
        <Header />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default  App;
