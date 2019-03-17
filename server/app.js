const restify = require('restify');

const { API_VERSION, PORT, SERVER_NAME } = require('./config');
const { log } = require('./helpers');
const middleware = require('./middleware');
const routes = require('./routes');

const logger = log('api');
logger.info('🤞 Initializing server');

const server = restify.createServer({
    name: SERVER_NAME,
    version: API_VERSION,
    log: logger,
});

middleware(server);
routes(server);

server.listen(PORT);
logger.info('🚀 Server ready. Listening on PORT :%s', PORT);

module.exports = server;
