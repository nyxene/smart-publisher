const bunyan = require('bunyan');

const { API_ROOT, API_VERSION, LOG_LEVEL } = require('./config');

const basePath = path => API_ROOT.replace(/\/$/, '') + '/v' + API_VERSION + '/' + path.replace(/^\//, '');
const log = moduleName =>
    bunyan.createLogger({
        name: moduleName,
        streams: [
            {
                level: LOG_LEVEL,
                stream: process.stdout,
            },
            // {
            //     level: LOG_LEVEL,
            //     type: 'rotating-file', // WARN for cluster: https://github.com/trentm/node-bunyan#stream-type-rotating-file
            //     path: `/logs/${moduleName}.log`,
            //     period: '1d',
            //     count: 3,
            // },
        ],
    });

module.exports = {
    basePath,
    log,
};
