// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
let app_root = 'src';
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    __dirname + '/' + app_root + '/index.js'
  ],
  output: {
    path: __dirname + '/public/js',
    publicPath: 'js/',
    filename: 'bundle.js'
  },
  module: {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
    /* preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!mapbox-gl\/js)/,
        loader: 'react-hot-loader!babel-loader'
      },*/
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules\/(?!mapbox-gl\/js)/
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        query: {
          mimetype: 'image/svg+xml',
          name: './public/css/semantic/themes/default/assets/fonts/icons.svg'
        }
      },

      {
        test: /\.woff$/,
        loader: 'url-loader',
        query: {
          mimetype: 'application/font-woff',
          name: './public/css/semantic/themes/default/assets/fonts/icons.woff'
        }
      },

      {
        test: /\.woff2$/,
        loader: 'url-loader',
        query: {
          mimetype: 'application/font-woff2',
          name: './public/css/semantic/themes/default/assets/fonts/icons.woff2'
        }
      },

      {
        test: /\.[ot]tf$/,
        loader: 'url-loader',
        query: {
          mimetype: 'application/octet-stream',
          name: './public/css/semantic/themes/default/assets/fonts/icons.ttf'
        }
      },
      {
        test: /\.eot$/,
        loader: 'url-loader',
        query: {
          mimetype: 'application/vnd.ms-fontobject',
          name: './public/css/semantic/themes/default/assets/fonts/icons.eot'
        }
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        query: {
          mimetype: 'image/png',
          name: './public/css/semantic/themes/default/assets/fonts/flags.png'
        }
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: __dirname + '/public',
      verbose: true,
      dry: false // true for simulation
    })
  ]
};
