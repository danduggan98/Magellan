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
            { //Load ts/tsx files with ts-loader
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [ {loader: "ts-loader"} ]
            },
            { //Load css files with css-loader
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    externals: nodeExternals()
};
