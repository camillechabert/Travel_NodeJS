module.exports = {
  /*
    |--------------------------------------------------------------------------
    | Port
    |--------------------------------------------------------------------------
    | Listening TCP port
    |
    */
  port: process.env.PORT || 3080,
  jwtSecret: 'Demo',
  jwtSession: {
    session: false
  },
  queryTokenName: 'userToken'
};
