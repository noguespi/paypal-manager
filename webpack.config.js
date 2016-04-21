const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};
process.env.BABEL_ENV = TARGET;
process.env.BABAR = 3;

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            // {test: /\.css$/, loaders: ['style', 'css'], include: PATHS.app},
            { test: /\.css$/, loader: 'style-loader!css-loader' },

            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'], // caching improve performances
                include: PATHS.app
            },

            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.versions.openssl': '"1.0.1"',
            'process.env.NODE_ENV': '"development"'
        })
    ]
};

// Default configuration
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',
        },
        
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}
