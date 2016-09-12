var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

    module.exports = [{
        entry: './src/client/entry.js',
        output: {path: __dirname, filename: 'public/client-bundle.js'},
        devtool: 'source-map',
        module: {
                loaders: [
                    {
                        test: /.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'react']
                        }
                    },
                    {
                        test: /\.less$/,
                        loader: "style!css!less"
                    }
                ]
            }
    },
    {
        entry: './src/server/entry.js',
        output: {path: __dirname, filename: 'server-bundle.js'},
        target: "node",
        externals: [nodeExternals()],
        module: {
            loaders: [
                {
                    test: /.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                    test: /\.less$/,
                    loader: "style!css!less"
                }
            ]
        }
    }];
