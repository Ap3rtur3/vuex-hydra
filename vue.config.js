const path = require('path');

// Local dev server
// Application source in demo/
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
