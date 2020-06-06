module.exports = {
    mode: "production",

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
                use: ['style-loader', 'css-loader'],
            },
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};