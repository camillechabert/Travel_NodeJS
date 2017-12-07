module.exports = {
  /*
    |--------------------------------------------------------------------------
    | Port
    |--------------------------------------------------------------------------
    | Listening TCP port
    |
    */
  port: process.env.PORT || 3080,
  OSRM_URL: 'http://router.project-osrm.org/',
  OSRM_VERSION: 'route/v1/driving/',
  jwtSecret: 'Demo',
  jwtSession: {
    session: false
  },
  queryTokenName: 'userToken'
};
