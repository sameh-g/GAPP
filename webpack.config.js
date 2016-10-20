module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};

// webpack-dev-server --progress --colors    
// webpack --progress --colors --watch    
// webpack --progress --colors     
// webpack ./entry.js bundle.js --module-bind "css=style!css"  