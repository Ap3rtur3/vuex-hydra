const path = require('path');

module.exports = {
    outputDir: 'demo_dist',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'demo', 'components')
            }
        },
    }
};
