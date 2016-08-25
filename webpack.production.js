var webpack = require('webpack');

module.exports = {
  entry: {
    'vuebootstrap':'./index.js'
  },
  output: {
    path: './production',
    publicPath: 'production/',
    filename: '[name].min.js',
    library: 'vuebootstrap',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
      	test: /\.js$/,
        exclude: /node_modules/,
      	loader: 'babel'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },
  vue:{
     loaders:{
         js:'babel'
     }
  },
  babel: {
    presets: ['es2015','stage-0'],
    plugins: ['transform-runtime']
  },
  plugins:[
    new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
