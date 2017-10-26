import React, {Component} from "react";
import "../stylesheets/main.scss";
import Header from "./layouts/GlobalHeader";
import Footer from "./layouts/GlobalFooter";
import {store} from "../store";

class App extends Component {

  render() {
    return (
        <div id="page-wrapper" className="main-app">
          <Header />
            <div className="content-app">
              {this.props.children}
            </div>
          <Footer />
        </div>
    );
  }
}

export default App;
