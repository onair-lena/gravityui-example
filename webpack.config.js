const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const WPORT = process.env.WPORT || 8080;

const Custom = path.resolve(__dirname, './src/components/');

const isDev = process.env.NODE_ENV === 'development';
const isWp = process.env.BUILD_ENV === 'webpack';

console.log({
  Custom,
  isDev,
  isWp
});

module.exports = () => ({
  mode: isDev ? 'development' : 'production',
  devtool: isDev && 'source-map',
  context: path.resolve(__dirname, './src'),
  optimization: {
    minimize: !isDev,
    minimizer: [new TerserPlugin()]
  },
  entry: {
    app: ['@babel/polyfill', './index.jsx']
  },
  resolve: {
    alias: {
      Src: path.resolve(__dirname, './src/')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      fs: false
    }
  },
  output: {
    path: path.resolve(__dirname, './web/c'),
    filename: isDev ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
    publicPath: isWp ? '/' : `c/`
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'resolve-url-loader', options: { root: __dirname } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[contenthash][ext][query]'
        }
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      L: 'leaflet'
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackBuildNotifierPlugin({
      sound: false
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|ru/),
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      template: path.resolve(__dirname, './src/index.html'),
      filename: isWp
        ? path.resolve(__dirname, './web/c/index.html')
        : path.resolve(__dirname, './web/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[name].css' : '[id].[chunkhash].css'
    }),
    new CleanWebpackPlugin(),
    ...(isDev ? [new ReactRefreshWebpackPlugin(), new ESLintPlugin({ fix: true })] : [])
  ],
  devServer: {
    port: WPORT,
    static: {
      directory: path.join(__dirname, 'web')
    },
    client: {
      logging: 'info',
      progress: true,
      overlay: true
    }
  }
});
