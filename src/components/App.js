import React from "react";
import "../stylesheets/main.scss";
import Header from './layouts/Header';
import Footer from './layouts/Footer';

export default class App extends React.Component {

  render() {
    return (
      <div id="page-wrapper" className="container">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
