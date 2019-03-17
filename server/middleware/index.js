const restify = require('restify');

const error = require('./error');
const logger = require('./logger');

module.exports = server => {
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.gzipResponse());

    server.pre(restify.pre.sanitizePath());

    logger(server);
    error(server);
};
