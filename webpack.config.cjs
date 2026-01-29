const webpack = require('webpack');
const ejs = require('ejs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('webpack').Configuration} */
const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    background: './background/index.ts',
    debug: './content-scripts/debug/index.ts',
    'popup/popup': './popup/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/popup': path.resolve(__dirname, 'src/popup'),
      '@/content-scripts': path.resolve(__dirname, 'src/content-scripts'),
      '@/background': path.resolve(__dirname, 'src/background'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window',
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'icons',
          to: 'icons',
          globOptions: { ignore: ['**/*.xcf'] },
        },
        {
          from: 'popup/index.html',
          to: 'popup/index.html',
          transform: transformHtml,
        },
        {
          from: 'manifest.json',
          to: 'manifest.json',
          transform: (content) => {
            const jsonContent = JSON.parse(content.toString());
            jsonContent.version = version;
            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ],
    }),
  ],
  optimization: {
    minimize: isProduction,
    splitChunks: false, // Extensions need single files per entry
  },
  performance: {
    hints: isProduction ? 'warning' : false,
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
};

/**
 * Transform HTML templates with EJS
 * @param {Buffer} content
 * @returns {string}
 */
function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;
