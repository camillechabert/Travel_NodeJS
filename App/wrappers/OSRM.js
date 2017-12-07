const http = require('node-fetch');
const conf = require('../../config/server');

const options = {
  overview: false,
  alternatives: true,
  steps: true
};

/**
 * Set dynamicly the parameters for the current request
 * @param {*Options for OSRM API} scopOptions
 */
const setParams = (scopOptions) => {
  let params = '';
  for (let opt in scopOptions) {
    if (!scopOptions.hasOwnProperty(opt)) {
      continue;
    }
    params = params + '&' + opt + '=' + scopOptions[opt];
  }
  params = '/?' + params.replace('&', '');
  return params;
};

/**
 * Fetch and return the routes from OSRM computation
 * @param {*Two points coordinates used to trace the route} coordinates
 * @param {*The options passed in parameters} setup
 */
const compute = (coordinates) => {
  const url = conf.OSRM_URL + conf.OSRM_VERSION + coordinates.join(';') + setParams(options);
  return http(url, { method: 'GET', redirect: 'follow', follow: 20 })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return {error: 'Internal error from OSRM WRAPPER'};
    });
};


module.exports = {
  options: options,
  compute: compute
};
