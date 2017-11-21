import React, { Component } from 'react';
import '../stylesheets/main.scss';
import Header from './layouts/GlobalHeader';
import Footer from './layouts/GlobalFooter';
import { store } from '../store';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPropagation: { userSession: store.getState().user.token !== null } };
  }

  propagateUserSession(signal) {
    this.setState({ dataPropagation: { userSession: signal } });
  }

  render() {
    const props = React.cloneElement(this.props.children, { dataPropagation: this.propagateUserSession.bind(this) });

    return (
      <div id="page-wrapper" className="main-app">
        <Header userSession={this.state.dataPropagation.userSession} dataPropagation={this.propagateUserSession.bind(this)} />
        <div className="content-app">
          {props}
        </div>
        <Footer userSession={this.state.dataPropagation.userSession} dataPropagation={this.propagateUserSession.bind(this)} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
