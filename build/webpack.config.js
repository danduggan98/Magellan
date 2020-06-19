"use strict";
var nodeExternals = require('webpack-node-externals');
var root = require('app-root-path');
module.exports = {
    //entry: './build/App.js',
    mode: "development",
    output: {
        path: root + '/build',
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{ loader: "ts-loader" }]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    externals: nodeExternals()
};
