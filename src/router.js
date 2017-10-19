import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import Chatroom from "./components/chat/Chatroom";
import NotFound from "./components/NotFound";
import Index from './components/Index';

import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Edition from './components/Authentication/Edition';

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      
      <Route path="login" component={Login}/>
      <Route path="sign-up" component={Register}/>
      <Route path="edit" component={Edition}/>

      <Route path="home" component={Home}/>
      <Route path="chat" component={Chatroom}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export { router };