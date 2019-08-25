const restify = require('restify');

module.exports = server => {
    server.get(
        '/*',
        restify.plugins.serveStatic({
            directory: './build/',
            default: 'index.html'
        })
    );
};
