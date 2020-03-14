import path from 'path';
import webpack from 'webpack';
import { CLIEngine } from 'eslint';
import HtmlPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleStatsWebpackPlugin as BundleStatsPlugin } from 'bundle-stats';

const analyzeBundle = Boolean(process.env.ANALYZE_BUNDLE);
const compareBundle = Boolean(process.env.COMPARE_BUNDLE);
const dev = process.env.NODE_ENV === 'development';
const apiUrl = process.env.API_URL;

const plugins = [
  new CleanPlugin(),
  new StylelintPlugin({
    configFile: '.stylelintrc',
    context: 'src',
    files: '**/*.scss',
    failOnError: true,
    quiet: false,
    syntax: 'scss'
  }),
  new HtmlPlugin({
    template: './src/index.html'
  }),
  new MiniCSSExtractPlugin({
    filename: '[name].css'
  }),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(dev || !apiUrl ? 'http://localhost:3000' : apiUrl)
  })
];

if (dev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (compareBundle || analyzeBundle) {
  plugins.push(
    new BundleStatsPlugin({
      compare: compareBundle
    })
  );
}

export default {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: './src/index.js',
  devServer: {
    compress: dev,
    open: true,
    overlay: true,
    historyApiFallback: true,
    hot: dev,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              formatter: CLIEngine.getFormatter('stylish')
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          dev ? 'style-loader' : MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
                require('postcss-flexbugs-fixes')
              ],
              sourceMap: dev
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src']
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 9
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          priority: -4,
          test: /[\\/]node_modules[\\/]/
        },
        react: {
          chunks: 'initial',
          name: 'vendor-react',
          priority: -1,
          test: /[\\/]node_modules[\\/](react)/
        },
        redux: {
          chunks: 'initial',
          name: 'vendor-redux',
          priority: -3,
          test: /[\\/]node_modules[\\/](@?redux)/
        },
        ui: {
          chunks: 'initial',
          name: 'ui-assets',
          priority: -2,
          test: /[\\/]node_modules[\\/](popper|@fortawesome)/
        }
      }
    }
  }
};
