import React from "react";
import "../stylesheets/main.scss";

// app component
export default class App extends React.Component {
  // render
  render() {
    return (
      <div id="page-wrapper" className="container">
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
