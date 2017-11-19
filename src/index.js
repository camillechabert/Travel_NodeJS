import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";
import 'semantic-ui-css/semantic.min.css';

process.env.MapboxKey = 'pk.eyJ1IjoianVoMzMiLCJhIjoiY2o5ZnZnMnpyMDQ1ajJxcnFoeXZuZWp6eCJ9.ECUpg6xQI-XcMTjfiZcvyw';
process.env.SocketUrl = 'http://localhost:3080';
process.env.NominationUrl = 'http://nominatim.openstreetmap.org/search.php?';
process.env.MapboxTilesStyle = 'mapbox://styles/mapbox/streets-v10';

process.env.createUserUrl = 'http://localhost:3080/auth/create-user';
process.env.authTokenUrl = 'http://localhost:3080/auth/token';

// render the main component
ReactDOM.render(
  <Provider store={store}>
    {router()}
  </Provider>,
  document.getElementById('app')
);
