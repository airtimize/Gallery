const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
          import: true,
          importLoaders: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.jsx', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/dist'),
  },
};

