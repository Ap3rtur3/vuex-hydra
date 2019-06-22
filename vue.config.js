const path = require('path');

module.exports = {
    configureWebpack: {
        output: {
            path: path.join(__dirname, 'dist')
        },
        resolve: {
            alias: {
                '@': path.join(__dirname, 'demo', 'components')
            }
        },
        entry: './src/index.js'
    }
};
